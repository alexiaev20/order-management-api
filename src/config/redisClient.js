const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    try {
        await redisClient.connect();
        console.log(' Conectado ao Banco em Memória Redis (Cache)!');
    } catch (err) {
        console.error(' Falha ao conectar no Redis:', err.message);
    }
})();

module.exports = redisClient;
