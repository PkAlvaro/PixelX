import { useParams } from "react-router-dom";
import "/src/assets/styles/game/waitRoom.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WaitRoom() {
    
    const [cantJugadores, setCantJugadores] = useState(0)
    const [status, setStatus] = useState("Esperando jugadores ...");
    const { idPartida } = useParams();
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();
    
    const fetchPartida = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/status`, {idPartida: idPartida}, {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            setCantJugadores(response.data.participaciones);
            if (response.data.status === "full") {
                setStatus("Listo para comenzar ...");
                setTimeout(() => {
                    irAPartida();
                }, 2000);
            }
        }).catch((error) => {
            console.error("Error al obtener los jugadores:", error);
        });
    }

    const irAPartida = () => {
        window.location.href = `/game/${idPartida}`;
    }

    useEffect(() => {
        if (!token) {
            navigate('/unauthorized');
            return;
        }
        fetchPartida();

        const interval = setInterval(() => {
            fetchPartida();
        }, 5000);

        return () => clearInterval(interval);
    }, [idPartida]);

    return (
        <div className="centered-box">
            <div className="box">
                <h1>Esperando a que se unan los jugadores</h1>
                <h2>Partida: N°{idPartida}</h2>
                <h2>Jugadores: {cantJugadores}/3</h2>
                <h2>{status}</h2>
            </div>
        </div>
    )
}

export default WaitRoom;