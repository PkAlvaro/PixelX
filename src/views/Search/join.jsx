import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useState } from 'react';
import "/src/assets/styles/LandingPage/landingPage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {
    const { user } = useContext(AuthContext);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();
    const [publica,setPublica] = useState(null);
    const [suspendido, setSuspendido] = useState(false);

    useEffect(() => {
        const checkEstado = async () => {
            if (user && token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${user.id}/estado`, 
                        {headers: { 'Authorization': `Bearer ${token}` }
                    });
                
                    if (response.data === 'suspendido') {
                        setSuspendido(true);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        checkEstado();
    }, [user, token]);
    
    const handleBack = () => {
        navigate('/');
    }

    const handleJoinPrivate = () => {
        if (!token || token === 'null') {
            navigate('/login');
            return;
        }
        if (suspendido) {
            window.alert('Tu cuenta ha sido suspendida. No puedes unirte a partidas.');
        } else {
            navigate('/enterCode');
        }
    }

    const handleJoinPublic = async (event) => {
        event.preventDefault();

        if (!token || token === 'null' || !user || user === 'null') {
            navigate('/login');
            return;
        }
        if (suspendido) {
            window.alert('Tu cuenta ha sido suspendida. No puedes unirte a partidas.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/prepartida/buscar/publica`, {
                id_usuario: user.id
            }, {headers: { 'Authorization': `Bearer ${token}` }});

            setPublica(response.data);
            const gameid = response.data.id;
            navigate(`/waitingRoom/${gameid}`);
            
        }
        catch (error) {
            console.error(error);
            if (error.response.data.inPartida) {
                window.alert('Ya estás buscando una partida, redirigiendo...');
                navigate(`/waitingRoom/${error.response.data.partidaID}`);
            }
        }
    }
    

    return (
        <>
            <div className='buttons'>
                 
                <a className='button' onClick={handleJoinPrivate}>Partida privada</a>
                <a className='button' onClick={handleJoinPublic}>Partida pública</a>
                <a className='button' onClick={handleBack}>Volver</a>
                
            </div>
        </>
    );
}

export default Join;