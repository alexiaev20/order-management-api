# Order Management API - Enterprise Edition

Uma API de gerenciamento de pedidos robusta, reconstruída sob os pilares da *Clean Architecture*, projetada para alta disponibilidade e suporte a grandes volumes de tráfego (E-commerce).

## 🚀 Arquitetura e Tecnologias

- **Node.js & Express**: Framework base com roteamento modular (MVC).
- **MongoDB (Mongoose)**: Banco de dados NoSQL persistente.
- **Redis (Cache em Memória)**: Aceleração das rotas de listagem para suportar picos de tráfego.
- **RabbitMQ (Mensageria)**: Publicação de eventos de criação de pedidos (`order_created_queue`) de forma assíncrona.
- **Segurança**: Autenticação **JWT**, encriptação irreversível **Bcrypt** e bloqueio Anti-DDoS **Express Rate Limit**.
- **Observabilidade**: Sistema de logs rotativos via **Winston** e interceptador HTTP **Morgan**.
- **DevOps**: Suíte de testes **Jest** no pipeline de Integração Contínua (**GitHub Actions**) e Infraestrutura nativa em **Docker**.

## 🛠 Como Executar

A arquitetura engloba 4 microsserviços. A inicialização deve ser feita exclusivamente via Docker para não poluir sua máquina local.

```bash
# Sobe o Node.js, MongoDB, Redis e RabbitMQ simultaneamente
docker-compose up -d --build
```

Acesse a documentação interativa em:
👉 `http://localhost:3000/order-management-api/docs`

## 🧪 Como Testar Isoladamente
```bash
npm install
npm test
```
