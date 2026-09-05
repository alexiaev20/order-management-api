const { connectRabbitMQ } = require('./config/rabbitmqClient');
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

// Conecta ao DB e sobe a aplicação
connectDB().then(async () => {
    await connectRabbitMQ();
    app.listen(PORT, () => {
        console.log(` API Rodando corporativamente em http://localhost:${PORT}`);
    });
});
