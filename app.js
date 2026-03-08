require('dotenv').config();
const express = require('express');
const Order = require('./database');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth/middleware');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Rota pública para gerar o token de acesso
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123456") {
        const token = jwt.sign({ user: username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }
    res.status(401).json({ message: "Usuário ou senha inválidos" });
});

// cria um novo pedido POST com Mapping - ROTA PROTEGIDA
app.post('/order', authMiddleware, async (req, res) => {
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

//Listar todos os pedidos - ROTA PROTEGIDA
app.get('/order/list', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar pedidos" });
    }
});


// Pegando os dados do pedido GET - ROTA PROTEGIDA
app.get('/order/:orderId', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedido" });
    }
});


// Atualizar o pedido - ROTA PROTEGIDA
app.put('/order/:orderId', authMiddleware, async (req, res) => {
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

//Deletar o pedido - ROTA PROTEGIDA
app.delete('/order/:orderId', authMiddleware, async (req, res) => {
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