import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
// import { GameContext } from '../context/GameContext';
import './Navbar.css';
import LogoutButton from '../views/Session/logout';
import axios from 'axios';
import Logo_PixelX from '../assets/imgs/LandingPage/Logo_PixelX.png';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    //const { isInGame, gameId, setIsInGame, setGameId } = useContext(GameContext);
    const [userinfo, setUserinfo] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    //const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${user.id}`, {headers: { 'Authorization': `Bearer ${token}` }})
                .then(response => {
                    setUserinfo(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user]);

    const handleReload = (e) => {
        e.preventDefault(); 
        localStorage.removeItem('isInGame');
        localStorage.removeItem('gameId');
        window.location.reload();
    };

    // const handleNavigation = (path) => {
    //     if (isInGame && gameId) {
    //         const confirmExit = window.confirm("¿Estás seguro de que quieres volver al menú principal? No podrás regresar a esta partida.");
    //         if (confirmExit) {
    //             setIsInGame(false);
    //             setGameId(null);
    //             localStorage.removeItem('isInGame');
    //             localStorage.removeItem('gameId');
    //             navigate(path);
    //         }
    //     } else {
    //         navigate(path);
    //     }
    // };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul className="navbar-links">
                <li><Link to="/" onClick={handleReload}>Inicio</Link></li>
                <li><Link to="/instructions">Instrucciones</Link></li>
                    <li><Link to="/aboutus">Sobre Nosotros</Link></li>
                    {user && <li><Link to="/join">Buscar partida</Link></li>}
                    {user && <li><Link to="/code">Crear partida</Link></li>}
                    {user && userinfo && userinfo.rol === "admin" && (<li><Link to="/admin">Administrar</Link></li>)}
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
                <img src={Logo_PixelX} alt="Game Logo" />
            </div>
        </nav>
    );
};

export default Navbar;
