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
    
    const handleBack = () => {
        navigate('/');
    }

    const handleJoinPrivate = () => {
        if (!token || token === 'null') {
            navigate('/login');
            return;
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

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/prepartida/buscar/publica`, {
                id_usuario: user.id
            }, {headers: { 'Authorization': `Bearer ${token}` }});
            setPublica(response.data);
            console.log(response.data);
            const gameid = response.data.id;
            navigate(`/waitingRoom/${gameid}`);
            
        }
        catch (error) {
            console.error(error);
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