import React, { useEffect, useState } from 'react';
import Board from './Board';
import "/src/assets/styles/game/dice.css";
import axios from 'axios';


const Dado = ({ onRoll }) => {
    const [dice, setDice] = useState(1);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    
    const rollDice = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partida/lanzar`, {headers: { 'Authorization': `Bearer ${token}` }});
            console.log(response.data);
            setDice(response.data.numero);
            onRoll(response.data.numero);
        } catch (error) {
            console.error("Error al lanzar el dado:", error);
        }
    };


    return (
        <div>
            <div className="dice-container" onClick={rollDice}>
                <div className={`dice dice-${dice}`}>
                    {dice}
                </div>
            </div>
        </div>
    );
};

export default Dado;