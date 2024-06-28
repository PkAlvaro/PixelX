import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/session/register.css";
import axios from 'axios';
import { AuthContext } from '/src/auth/AuthContext.jsx';


function Register() {
    const {token, setToken} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

    
        if (password !== password2) {
            setMsg('Las contraseñas no coinciden')
            return;
        }
        try {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                nombre: name,
                email: email,
                username: username,
                password: password
            }).then((response) => {
                const access_token = response.data.access_token;
                setToken(access_token);
                setMsg(response.data.message);

                window.location.href = '/login';

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
       
    } catch (error) {
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
    }
};


    const handleBack = () => {
        navigate('/');
    }

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="register-container">
            <div className='register-box'>
                <h1 className='register-title'>Registro</h1>
                <p className='register-message'>Únete a PixelX y disfruta de todas las modalidades del juego</p>
                <div className="errormsg">{msg}</div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Nombre completo"
                    onChange={e => setName(e.target.value)}
                    required
                    
                />
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Nombre de usuario"
                    onChange={e => setUsername(e.target.value)}
                    
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Correo electrónico"
                    onChange={e => setEmail(e.target.value)}
                    
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Contraseña"
                    onChange={e => setPassword(e.target.value)}
                   
                />
                <input
                    type="password"
                    name="password2"
                    value={password2}
                    placeholder="Repetir contraseña"
                    onChange={e => setPassword2(e.target.value)}
                    
                />
                </div>
            <div className="button-container">
            <button type="submit" className="button-register">Registrarse</button>
            <button type="button" className="button-register" onClick={handleLogin}>Iniciar sesión</button>
            <button type="button" className="button-register" onClick={handleBack}>Volver</button>
            </div>       
            </form>
        </div>
    </div>
    );
}


export default Register;