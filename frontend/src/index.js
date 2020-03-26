// Importar o react
import React from 'react';
// Importar a integração do React com a DOM
import ReactDOM from 'react-dom';
// Importando o arquivo App.js
import App from './App';

// Renderizar (colocar em tela), o componente <App /> dentro da div com o id="root"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);