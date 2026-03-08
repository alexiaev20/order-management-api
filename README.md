# Order Management API 

Esta API de Gerenciamento de Pedidos foi desenvolvida como uma solução para integração de dados entre sistemas. O projeto prioriza a separação de responsabilidades, a segurança da informação e a auditabilidade através de testes automatizados e documentação padronizada.

---

## Arquitetura e Tecnologias

* **Ambiente de Execução:** Node.js com Framework Express.
* **Persistência de Dados:** MongoDB utilizando o ODM Mongoose para modelagem de esquemas.
* **Segurança:** Autenticação via JSON Web Token (JWT) e proteção de variáveis sensíveis com Dotenv.
* **Documentação:** Especificação OpenAPI 3.0 via Swagger UI, com definições desacopladas em arquivo JSON.
* **Qualidade de Software:** Scripts de testes automatizados em PowerShell para validação de endpoints e fluxos de exceção.

---

## Funcionalidades Técnicas

### 1. Mapeamento de Payload (Data Transformation)
A API atua como um middleware de transformação de dados. Ela recebe objetos de entrada com nomenclatura em português e realiza o mapeamento para um esquema de banco de dados em inglês, garantindo a integridade dos tipos de dados durante a conversão.

### 2. Protocolo de Segurança
* **Middlewares de Autenticação:** Todas as rotas críticas exigem um Bearer Token válido no cabeçalho da requisição.
* **Gerenciamento de Segredos:** Chaves de criptografia e URIs de banco de dados são injetadas via variáveis de ambiente, prevenindo o hardcoding de informações sensíveis no código-fonte.
* **Higienização de Documentação:** A documentação técnica foi configurada para não expor credenciais de teste em exemplos estáticos, seguindo boas práticas de segurança ofensiva e redução de superfície de exposição.

---

## Instruções de Instalação e Execução

### Configuração do Ambiente
1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
Configure o arquivo `.env` na raiz do diretório com os parâmetros necessários.  
Utilize o modelo abaixo como referência (certifique-se de que o arquivo real está no `.gitignore`):

```env
SECRET_KEY=[SUA_CHAVE_MESTRA_JWT]
PORT=[PORTA_DEFINIDA_PARA_O_SERVIÇO]
```

## Execução da Aplicação

Execute a aplicação com o comando:

  ```bash
node app.js
```

## Documentação da API

A documentação interativa detalha todos os endpoints, modelos de dados e requisitos de segurança.

**Interface Swagger**

```text
/order-management-api/docs
```

Interface Swagger: /order-management-api/docs (Acessível via Host e Porta configurados).


## Ciclo de Testes Automatizados

Para garantir a estabilidade das entregas, foi desenvolvido um conjunto de testes que valida o ciclo de vida completo de um pedido (**CRUD**) e a eficácia das travas de segurança.

**Execução via terminal (PowerShell):**

```powershell
./tests/api_tests.ps1
```

## Histórico de Versionamento (Git Flow)

O projeto seguiu uma metodologia de desenvolvimento baseada em tarefas (*Task-based Development*), garantindo um histórico de commits rastreável e auditável:
- **task/01-setup** — Inicialização do ambiente e dependências.

- **task/02-database** — Modelagem e conexão com MongoDB.

- **task/03-api** — Implementação de rotas e lógica de mapping.

- **task/04-docs** — Estrutura de documentação inicial.

- **task/05-security** — Implementação de JWT e proteção de rotas.

- **task/06-full-tests** — Desenvolvimento da suíte de testes automatizados.

- **task/07-docs-swagger** — Refatoração para documentação profissional desacoplada e segura.

## Responsável Técnica

**Alexia Melo**


