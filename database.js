const mongoose = require('mongoose');

// Conectando ao MongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/orderDB')
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definindo a estrutura da tabela 
const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    items: [{
        productId: { type: Number, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;