import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/Admin/admin.css";

function Admin() {
    const [user, setUser] = useState([]);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/`,
        { headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.error("Error al obtener los usuarios:", error);
        });
}

const handleEstado = (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'suspendido' ? 'disponible' : 'suspendido';
    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${id}/suspender`, {
        estado: nuevoEstado
    }, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then((response) => {
        fetchUsers();
    })
    .catch((error) => {
        console.error("Error al cambiar el estado del usuario:", error);
    });
}



return (
    <div className="admin-container">
        <h1 className="admin-title">Usuarios</h1>
        <ul className='admin-box'>
            {user.map((item, index) => (
                <li key={index} className='admin-message'>
                    <span className="admin-name">Nombre: {item.nombre}</span>
                    <span className="admin-email">Correo: {item.email}</span>
                    <span className="admin-rol">Rol: {item.rol}</span>
                    <span className="admin-estado">Estado: {item.estado}</span>
                    <button type="button" className="button-register" onClick={() => handleEstado(item.id, item.estado)}>
                        {item.estado === 'suspendido' ? 'Disponible' : 'Suspender'}
                    </button>
                </li>
            ))}
        </ul>
        <div className="button-container">
            <button type="button" className="button-register" onClick={handleBack}>Volver</button>
        </div>
    </div>
);
}

export default Admin;