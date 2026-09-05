const amqp = require('amqplib');

let channel;

const connectRabbitMQ = async () => {
    try {
        const url = process.env.RABBITMQ_URI || 'amqp://localhost';
        const connection = await amqp.connect(url);
        channel = await connection.createChannel();
        await channel.assertQueue('order_created_queue', { durable: true });
        console.log(' Conectado ao RabbitMQ (Mensageria Assíncrona)!');
    } catch (err) {
        console.error(' Falha ao conectar no RabbitMQ:', err.message);
    }
};

const publishOrder = (order) => {
    if (!channel) return;
    channel.sendToQueue('order_created_queue', Buffer.from(JSON.stringify(order)), { persistent: true });
    console.log(` Evento [order_created] publicado na fila do RabbitMQ: ${order.orderId}`);
};

module.exports = { connectRabbitMQ, publishOrder };
