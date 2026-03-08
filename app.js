const express = require('express');
const Order = require('./database');
const app = express();

app.use(express.json());

// ria um novo pedido POST com Mapping
app.post('/order', async (req, res) => {
    try {
        const data = req.body;
        const mappedOrder = {
            orderId: data.numeroPedido,
            value: data.valorTotal,
            creationDate: new Date(data.dataCriacao),
            items: data.items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
        const newOrder = new Order(mappedOrder);
        await newOrder.save();
        res.status(201).json({ message: "Pedido criado e mapeado com sucesso!", data: newOrder });
    } catch (error) {
        res.status(400).json({ message: "Erro na criação ou mapping", error: error.message });
    }
});

// Pegando os dados do pedido GET
app.get('/order/:orderId', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedido" });
    }
});

//Listar todos os pedidos 
app.get('/order/list', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar pedidos" });
    }
});

// Atualizar o pedido 
app.put('/order/:orderId', async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            req.body,
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "Pedido não encontrado para atualizar" });
        res.json({ message: "Pedido atualizado!", data: updatedOrder });
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar", error: error.message });
    }
});

//Deletar o pedido 
app.delete('/order/:orderId', async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });
        if (!deletedOrder) return res.status(404).json({ message: "Pedido não encontrado para deletar" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar" });
    }
});

// Liga o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Rodando em http://localhost:${PORT}`);
});