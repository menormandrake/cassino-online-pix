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

// server.js (Express serve build React)
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, 'build')));

// Para qualquer rota, retorna index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// package.json
{
  "name": "casino-online",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js",
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
npm start        # inicia servidor Express na porta 3000
teste localado em http://localhost:3000
```

—

// src/api/api.js
import axios from 'axios';
const apiClient = axios.create({ baseURL: 'https://cassino-backend-xn3l.onrender.com' });
export function getGames() { return apiClient.get('/games'); }
export function deposit(data) { return apiClient.post('/deposit', data); }
export function withdraw(data) { return apiClient.post('/withdraw', data); }

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/games">Games</Link></li>
      <li><Link to="/banking">Banking</Link></li>
    </ul>
  </nav>
);
export default Navbar;

// src/components/GameList.js
import React, { useEffect, useState } from 'react';
import { getGames } from '../api/api';
const GameList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getGames()
      .then(res => setGames(res.data))
      .catch(err => setError('Erro ao carregar jogos'));
  }, []);
  if (error) return <p>{error}</p>;
  return (
    <div><h1>Available Games</h1><ul>{games.map(g => <li key={g.id}>{g.name}</li>)}</ul></div>
  );
};
export default GameList;

// src/components/DepositWithdraw.js
import React, { useState } from 'react';
import { deposit, withdraw } from '../api/api';
const DepositWithdraw = () => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const handle = async () => {
    setLoading(true); setStatus('');
    try { const action = type==='deposit'?deposit:withdraw; await action({ amount }); setStatus(type+' successful!'); }
    catch(e){ setStatus('Error: '+(e.response?.data?.message||e.message)); }
    setLoading(false);
  };
  return (
    <div>
      <h1>Banking</h1>
      <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} min="0"/>
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <button onClick={handle} disabled={loading}>{loading?'Processing...':'Submit'}</button>
      {status && <p>{status}</p>}
    </div>
  );
};
export default DepositWithdraw;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameList from './components/GameList';
import DepositWithdraw from './components/DepositWithdraw';
const App=()=> (
  <Router><Navbar /><Routes>
    <Route path="/games" element={<GameList/>}/>
    <Route path="/banking" element={<DepositWithdraw/>}/>
  </Routes></Router>
);
export default App;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

