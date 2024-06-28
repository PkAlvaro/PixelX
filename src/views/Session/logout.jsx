import React, {useContext, useState} from "react";
import { AuthContext } from "/src/auth/AuthContext.jsx";
import { Link } from 'react-router-dom';


const LogoutButton = () => {
    const {logout} = useContext(AuthContext);
    const [msg, setMsg] = useState('');

    const handleLogout = () => {
        const isconfirm = window.confirm('¿Estás seguro de cerrar sesión?');
        if (isconfirm) {
            logout();
            window.location.href = '/';
        }
    };

    return (
        <>
        {msg.length > 0 && <div className="successmsg">{msg}</div>}
        <Link to="/" onClick={handleLogout} className="navbar-logout">Cerrar sesión</Link>
        </>
    );
}

export default LogoutButton;