# 🔐 SecureAPI-MySQL

Uma API Node.js segura com autenticação via JWT, criptografia com Bcrypt e banco de dados MySQL — desenvolvida **sem ORM**, utilizando `mysql2/promise` e `import` modules (ESM).

Ideal para quem deseja aprender ou construir uma base sólida para projetos com autenticação e rotas protegidas.

---

## 📦 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **JWT (jsonwebtoken)**
- **Bcrypt**
- **dotenv**

---

## 📁 Estrutura do Projeto

```
SecureAPI-MySQL/
│
├── config/
│   └── database.js          # Conexão com o MySQL
│
├── controllers/
│   └── authController.js    # Lógica de autenticação e registro
│
├── middlewares/
│   └── authMiddleware.js    # Middleware para proteger rotas com JWT
│
├── routes/
│   └── authRoutes.js        # Rotas de login, registro e rota protegida
│
├── .env                     # Variáveis de ambiente (JWT_SECRET, DB config)
├── server.js                # Arquivo principal da aplicação
├── package.json
└── README.md
```

---

## ⚙️ Configuração do arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000

MYSQL_HOST=localhost
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=nome_do_banco

JWT_SECRET=SuaChaveSecretaForte_Aqui
```

---

## 🗃️ Banco de Dados

Execute o seguinte SQL no seu MySQL:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

## 📮 Rotas da API

### ✅ Registro

**POST** `/api/register`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

---

### 🔓 Login

**POST** `/api/login`

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "JWT_TOKEN_AQUI"
}
```

---

### 🔐 Rota Protegida

**GET** `/api/protected`

Headers:
```
Authorization: Bearer JWT_TOKEN_AQUI
```

**Resposta:**
```json
{
  "message": "Bem-vindo, usuário com ID X"
}
```

---

## 🛡️ Segurança

- Senhas são armazenadas com **Bcrypt (10 salt rounds)**
- Tokens são assinados com **JWT e expiram em 1 hora**
- Rotas protegidas com middleware que valida o token

---

## 🧪 Testando com Postman

1. Registre um novo usuário via `/api/register`
2. Faça login e copie o token JWT
3. Acesse `/api/protected` com o token no header:
```
Authorization: Bearer SEU_TOKEN
```


---

Desenvolvido por Anderson Freire. 🚀