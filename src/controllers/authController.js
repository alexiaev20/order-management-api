const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Usuário já existe." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor.", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: "Credenciais inválidas." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Credenciais inválidas." });

        const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret_key";
        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '2h' });
        
        res.json({ auth: true, token });
    } catch (error) {
        res.status(500).json({ message: "Erro no login.", error: error.message });
    }
};
