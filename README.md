Boiler - Fullstack Auth Boilerplate

Boilerplate de autenticação fullstack com React + Node.js + TypeScript. Base pra iniciar projetos que precisam de login, validação e estrutura escalável.

Stack e Motivos

**Frontend - `client/`**
| Tech | Por quê |
| --- | --- |
| **React 18 + Vite** | Build rápido, HMR instantâneo. Vite é padrão pra SPA moderna |
| **TypeScript** | Tipagem pra evitar bugs de `undefined` e facilitar refactor |
| **Axios** | Cliente HTTP com interceptors. Melhor que `fetch` pra lidar com token e erros |
| **React Router Dom** | Roteamento client-side pra proteger rotas privadas |
| **CSS Modules** | Escopo de CSS por componente sem conflito de classes |

**Backend - `server/`**
| Tech | Por quê |
| --- | --- |
| **Node.js + Fastify** | Fastify é 2x mais rápido que Express, com suporte nativo a JSON Schema e TS |
| **TypeScript** | Tipagem no back = contrato claro com o front. Menos `req.body` sem tipo |
| **Zod** | Validação de schema runtime. Garante que `req.body` tem formato certo antes do controller |
| **TSX** | Roda TS direto sem build. `tsx watch` reinicia sozinho ao salvar |
| **Dotenv + Envalid** | Valida variáveis de ambiente na inicialização. Se faltar `PORT`, o app nem sobe |
| **CORS** | Libera o front `localhost:5173` pra acessar a API em `localhost:3333` |

Estrutura do Projeto



boiler/

├── server/                 # API Node + Fastify

│   ├── src/

│   │   ├── config/

│   │   │   └── env.ts      # Validação de .env com envalid

│   │   ├── middlewares/

│   │   │   └── validate.ts # Middleware Zod pra validar req.body/query/params

│   │   ├── routes/         # Definição das rotas

│   │   └── server.ts       # Entrada do servidor Fastify

│   ├── .env.example        # Template de variáveis de ambiente

│   └── package.json

│

├── nog-front/              # SPA React + Vite

│   ├── src/

│   │   ├── pages/

│   │   │   ├── Login.tsx   # Tela de login

│   │   │   └── Dashboard.tsx # Rota protegida pós-login

│   │   ├── services/

│   │   │   └── api.ts      # Instância do Axios com baseURL

│   │   ├── App.tsx         # Rotas do React Router

│   │   └── main.tsx        # Entrada do React

│   ├── .env.example        # Template VITE_API_URL

│   └── package.json

│

├── .gitignore              # Ignora node_modules, dist, .env

└── README.md


Como Rodar

**Pré-requisitos**
- Node.js 18+
- NPM ou PNPM

**1. Clonar e instalar**

```bash
git clone https://github.com/ikifars/boiler.git
cd boiler
```



Instala as deps dos dois projetos:

```
cd server && npm install
cd ../client && npm install
```


*2. Variáveis de ambiente*



*Backend* `server/.env`:

cp server/.env.example server/.env


Conteúdo:

PORT=3333
NODE_ENV=dev
CLIENT_URL=http://localhost:5173
JWT_SECRET=troque-por-uma-chave-forte




*Frontend* `nog-front/.env`:

cp nog-front/.env.example nog-front/.env


Conteúdo:

VITE_API_URL=http://localhost:3333




*3. Rodar em desenvolvimento*



Terminal 1 - Back:
```
cd server
npm run dev
```

Sobe em `http://localhost:3333`



Terminal 2 - Front:
```
cd nog-front
npm run dev
```

Sobe em `http://localhost:5173`



*4. Testar login*



Acesse `http://localhost:5173`. 

Use as credenciais mockadas:

- *Email*: `admin@test.com`

- *Password*: `123456`



Se funcionar, redireciona pra `/dashboard` com "Você está logado!".



Scripts Disponíveis



*Server:*

Comando	O que faz
`npm run dev`	Sobe com `tsx watch` + hot reload
`npm run build`	Compila TS pra `dist/`
`npm start`	Roda versão compilada pra produção




*Front:*

Comando	O que faz
`npm run dev`	Sobe Vite em modo dev
`npm run build`	Gera build de produção em `dist/`
`npm run preview`	Serve o build localmente




Troubleshooting



Erro	Causa	Solução
`ERR_CONNECTION_REFUSED`	Front batendo na porta errada	Confira `VITE_API_URL` no `.env` do front. Back roda na 3333
`import.meta.env` sublinhado	TS não conhece tipos do Vite	Crie `src/vite-env.d.ts` com `/// <reference types="vite/client" />`
`process is not defined`	Usando `process.env` no browser	Use `import.meta.env` no front. `process` só existe no Node
`CORS error`	Back não liberou origin do front	`app.use(cors({ origin: env.CLIENT_URL }))` no Fastify
`Cannot find module 'dotenv/config'`	TSX não carregou dotenv	`import 'dotenv/config'` na primeira linha do `env.ts`

Feito pra acelerar setup inicial e evitar código repetido em todo projeto novo.


