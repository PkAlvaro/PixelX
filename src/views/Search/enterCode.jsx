import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import '/src/assets/styles/Search/code.css';
import { useNavigate } from 'react-router-dom';

function EnterCode () {
    const {user} = useContext(AuthContext);
    const [partida , setPartida] = useState(null);
    const [error, setError] = useState('');
    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if  (!user) {
            setError('Debes iniciar sesión para poder jugar');
            return;
        }

        if (!codigo) {
            setError('Debes ingresar un código');
            return;
        }
      

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/prepartida/buscar/privada`, {
                id_usuario: user.id,
                codigo: codigo
            }, {headers: { 'Authorization': `Bearer ${token}` }});
            setPartida(response.data);
            console.log(response.data);
            if (!response.data) {
                setError('No se encontró la partida');
            } else {
                navigate(`/waitingRoom/${response.data.id}`);
            }

        }
        catch (error) {
            setError('Error al buscar la partida');
            console.error(error);
        }
    };

    return (
        <div className="code-container">
            <div className='code-box'>
                <h1 className='code-title'>Buscar partida privada</h1>
                <p className='code-message'>Ingresa el código de la partida</p>
                <div className="msg">{error}</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="codigo">Código de la partida:</label>
                    <input
                        id="codigo"
                        name="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                    <button type="submit">Buscar partida</button>
                </form>
                {partida && (
                    <div>
                        <p className='code-message'>Partida encontrada</p>
                        <p className='code-message'>Código de la partida: {partida.codigo}</p>
                </div>
                )}
            </div>
            </div>
    )
}

export default EnterCode;