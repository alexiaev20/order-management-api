const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Acesso negado. Token não fornecido." });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Acesso negado. Formato de token inválido." });

    try {
        const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret_key";
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado." });
    }
};
