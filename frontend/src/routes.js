import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importar Pages/Componentss
import Logon from './pages/Logon'


export default function Routes() {
    return (
        <BrowserRouter>
            // Garante que as rotas serão executadas uma por vez
            <Switch>
                <Route path="/" component={Logon} />
            </Switch>
        </BrowserRouter>
    );
}