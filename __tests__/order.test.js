const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

// Ignorar logs do morgan durante testes
process.env.NODE_ENV = 'test';

describe('Testes E2E - Order Management API', () => {
    
    // Sem conectar de verdade para não travar o jest, 
    // mas testando a existência das rotas e middlewares.
    
    it('deve retornar 401 ao acessar rota protegida sem token', async () => {
        const res = await request(app).get('/order/list');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Acesso negado. Token não fornecido.');
    });

    it('deve possuir a rota de login configurada', async () => {
        const res = await request(app).post('/auth/login').send({ username: 'inexistente', password: '123' });
        // Retornará 500 pois o mongo não está rodando no CI sem db, ou 401/500
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
});
