require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // path adaptado
const orderRoutes = require('./routes/orderRoutes');
const jwt = require('jsonwebtoken'); // Para mock de login atual (será removido na próxima branch)

const app = express();
app.use(express.json());

// Documentação
app.use('/order-management-api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mock Login (Será reestruturado no Security Auth Branch)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123456") {
        const token = jwt.sign({ user: username }, process.env.SECRET_KEY || 'fallback_secret_key', { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }
    res.status(401).json({ message: "Usuário ou senha inválidos" });
});

// Rotas corporativas
app.use('/', orderRoutes);

module.exports = app;
