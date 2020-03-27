import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    // Armazenar estados dos inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // Guarda o histórico da navegação
    const history = useHistory();
    
    // Função responsável por fazer o cadastro do usuário
    async function handleRegister(e) {
        // Prevenir o recarregamento da página, padrão
        e.preventDefault();

        // Armazenar dados do form
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`)
            
            //Enviar o histórico para a rota raíz, de login
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    // Acompanhar as mudanças nesse input, pegar o evento de mudança e colocar na variável armazenada no estado
                    onChange={e => setName(e.target.value)}
                    />
                    <input 
                    placeholder="E-mail"
                    value={email}
                    // Acompanhar as mudanças nesse input, pegar o evento de mudança e colocar na variável armazenada no estado
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="WhatsApp"
                    value={whatsapp}
                    // Acompanhar as mudanças nesse input, pegar o evento de mudança e colocar na variável armazenada no estado
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input 
                        placeholder="Cidade"
                        value={city}
                        // Acompanhar as mudanças nesse input, pegar o evento de mudança e colocar na variável armazenada no estado
                        onChange={e => setCity(e.target.value)}
                        />
                        <input 
                        placeholder="UF" style={{ width: 80 }}
                        value={uf}
                        // Acompanhar as mudanças nesse input, pegar o evento de mudança e colocar na variável armazenada no estado
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}