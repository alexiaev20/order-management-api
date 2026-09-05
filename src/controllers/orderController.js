const { publishOrder } = require('../config/rabbitmqClient');
const redisClient = require('../config/redisClient');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
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
        publishOrder(newOrder);
        res.status(201).json({ message: "Pedido criado e mapeado com sucesso!", data: newOrder });
    } catch (error) {
        res.status(400).json({ message: "Erro na criação ou mapping", error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const cacheKey = 'orders:all';
        const cachedOrders = await redisClient.get(cacheKey);

        if (cachedOrders) {
            console.log(" Retornando orders do CACHE REDIS (Alta Performance)");
            return res.json(JSON.parse(cachedOrders));
        }

        console.log(" Buscando orders no MONGODB...");
        const orders = await Order.find();
        
        // Salva no cache por 60 segundos
        await redisClient.setEx(cacheKey, 60, JSON.stringify(orders));
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar pedidos" });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedido" });
    }
};

exports.updateOrder = async (req, res) => {
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
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });
        if (!deletedOrder) return res.status(404).json({ message: "Pedido não encontrado para deletar" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar" });
    }
};
