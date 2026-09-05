const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/orderDB';
        await mongoose.connect(uri);
        console.log(' Conectado ao MongoDB com sucesso (via Mongoose)!');
    } catch (err) {
        console.error(' Erro Crítico: Falha de conexão ao MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
