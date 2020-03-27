// Importar Biblioteca de Internacionalização para a aplicação
import 'intl';
// Importar a linguagem Português do Brasil
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

// Importar routes
import Routes from './src/routes';

export default function App() {
  return (
    <Routes />
  );
}