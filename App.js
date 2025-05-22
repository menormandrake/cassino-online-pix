// Projeto Cassino Online - Versão completa (Front-end React) com servidor Express para deploy no Render

// 1. Estrutura de pastas:
// casino-online/
// ├── build/                  ← pasta gerada pelo `npm run build`
// ├── public/
// │   └── index.html
// ├── src/
// │   ├── api/api.js
// │   ├── components/Navbar.js
// │   ├── components/GameList.js
// │   ├── components/DepositWithdraw.js
// │   ├── App.js
// │   └── index.js
// ├── server.js               ← servidor Express para servir arquivos estáticos
// ├── package.json
// └── README.md

// **src/server.js** (Express serve build React)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, '..', 'build')));

// Para qualquer rota, retorna index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// **package.json**
{
  "name": "casino-online",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node src/server.js",
    "build": "react-scripts build",
    "postinstall": "npm run build"
  },
  "dependencies": {
    "axios": "^1.4.0",
    "express": "^4.18.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}

// README.md
# Casino Online

Aplicação React servida via Express, pronta para deploy em plataformas como Render.

## Comandos

```bash
npm install      # instala dependências e roda postinstall (build)
npm start        # inicia servidor Express executando src/server.js na porta 3000
teste local: http://localhost:3000
```

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
