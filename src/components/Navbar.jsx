import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './Navbar.css';
import LogoutButton from '../views/Session/logout';
import axios from 'axios';

const Navbar = () => {
    
    const { user } = useContext(AuthContext);
    const [userinfo, setUserinfo ] = useState(null);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (user) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${user.id}`, {headers: { 'Authorization': `Bearer ${token}` }})
                .then(response => {
                    setUserinfo(response.data);
                    console.log(response.data);
                  
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user]);



    return (
        <nav className="navbar">
            <div className="navbar-left">
            <ul className="navbar-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/instructions">Instrucciones</Link></li>
                <li><Link to="/aboutus">Sobre Nosotros</Link></li>
                {user && <li><Link to="/join">Buscar partida</Link></li>}
                {user && <li><Link to="/code">Crear partida</Link></li>}
                {user && userinfo && userinfo.rol === "admin" && (<li><Link to="/admin">Administrar</Link></li>)}
                {user && userinfo && userinfo.rol === "admin" && (<li><Link to="/endpoints">Endpoints</Link></li>)}
            </ul>
            </div>
            <div className="navbar-right">
            <ul className="navbar-links">
                {user && userinfo && userinfo.nombre !== null && userinfo.nombre !== undefined &&
                    <>
                     <li className="navbar-username">Bienvenido {userinfo.nombre}</li>
                    </>
                }
                {user && <li><LogoutButton /></li>}
            </ul>
            </div>
            <div className="navbar-logo">
                <img src={'/src/assets/imgs/LandingPage/Logo PixelX.png'} alt="Game Logo" />
            </div>
        </nav>
    );
};

export default Navbar;
