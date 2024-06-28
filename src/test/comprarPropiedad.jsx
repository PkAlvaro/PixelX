import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/session/login.css";
import {AuthContext} from '/src/auth/AuthContext.jsx';


function ComprarPropiedad () {

    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const [id_jugador, setId_jugador] = useState('');
    const [id_partida, setId_partida] = useState('');
    const [id_casilla, setId_casilla] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/comprar`,{
                id_partida: id_partida,
                id_jugador: id_jugador,
                id_casilla: id_casilla
                
            },{
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setResult(response.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="code-container">
            <div className="code-box">
            <h1 className="code-title">Comprar Propiedad</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="id_partida">ID Partida</label>
                    <input 
                    type="text" 
                    id="id_partida" 
                    value={id_partida} 
                    onChange={(e) => setId_partida(e.target.value)} 
                    required
                />
                </div>
                <div className="input-container">
                    <label htmlFor="id_jugador">ID Jugador</label>
                    <input 
                    type="text" 
                    id="id_jugador" 
                    value={id_jugador} 
                    onChange={(e) => setId_jugador(e.target.value)} 
                    required
                />
                </div>
                <div className="input-container">
                    <label htmlFor="id_casilla">ID Casilla</label>
                    <input 
                    type="text" 
                    id="id_casilla" 
                    value={id_casilla} 
                    onChange={(e) => setId_casilla(e.target.value)} 
                    required
                />
                </div>
                <button type="submit">Comprar Propiedad</button>
            </form>
            {result && (
                <div className="result">
                    <h3>Resultado:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
        </div>
    );
}

export default ComprarPropiedad;