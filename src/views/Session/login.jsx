import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/session/login.css";
import axios from 'axios';
import {AuthContext} from '/src/auth/AuthContext.jsx';

function Login() {
    const {token, setToken} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            email: email,
            password: password
        }).then((response) => {
            const access_token = response.data.access_token;
            setToken(access_token);
            setMsg(response.data.message);

            window.location.href = '/';
            
        
        }).catch((error) => {
            if (error.response) {
                // Verifica si el error.response.data.message es un objeto
                if (typeof error.response.data.message === 'object') {
                    setMsg(JSON.stringify(error.response.data.message));
                } else {
                    setMsg(error.response.data || "Error al registrarse");
                }
            } else {
                setMsg("Error al registrarse");
            }
        });
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-container">
            <div className='login-box'>
                <h1 className='login-title'>Iniciar sesión</h1>
                <p className='login-message'>Ingresa a tu cuenta de PixelX</p>
                <div className="msg">{msg}</div>
                <form onSubmit={handleSubmit}>
                <div className='input-group'>   
                    <input 
                        type="email"
                        name = "email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        name = "password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                        <button type="submit" className='login-button'>Iniciar sesión</button>
                        <button type="button" className="button-register" onClick={handleRegister}>Registrarse</button>
                        <button type="button" className="button-register" onClick={handleBack}>Volver</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;