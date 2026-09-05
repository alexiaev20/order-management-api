const morgan = require('morgan');
const logger = require('./config/logger');
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const rateLimit = require('express-rate-limit');

const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

// Logger HTTP (Morgan via Winston)
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));


// Proteção contra ataques DDoS / Brute Force
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 acessos por IP
    message: "Muitas requisições originadas deste IP. Tente novamente mais tarde."
});
app.use(apiLimiter);

app.use('/order-management-api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas Oficiais
app.use('/auth', authRoutes);
app.use('/', orderRoutes);

module.exports = app;
