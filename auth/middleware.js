require('dotenv').config();
const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega o token do formato bearer token

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next(); // Autorizado! Segue para a rota
    } catch (error) {
        res.status(403).json({ message: "Token inválido ou expirado." });
    }
};