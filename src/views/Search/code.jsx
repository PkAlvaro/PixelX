import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import '/src/assets/styles/Search/code.css';
import { useNavigate } from 'react-router-dom';



function Code () {
    const {user} = useContext(AuthContext);
    const [turnos, setTurnos] = useState(20);
    const [partida , setPartida] = useState(null);
    const [error, setError] = useState('');
    const [mensajeCopiado, setMensajeCopiado] = useState(false);
    const [contador, setContador] = useState(10);
    const navigate = useNavigate();
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setPartida(null);

        if (!user) {
            setError('Debes iniciar sesión para poder jugar');
            return;
        }

        if (suspendido) {
            setError('Tu cuenta ha sido suspendida. No puedes crear partidas.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/prepartida/crear/privada`, {
                id_usuario: user.id,
                turnos: turnos
            }, {headers: { 'Authorization': `Bearer ${token}` }});
            setPartida(response.data);
            copiarAlPortapapeles(response.data.codigo);
            let contador = 10;
            setContador(contador);
            const timer = setInterval(() => {
                contador -= 1;
                setContador(contador);
                if (contador === 0) {
                    clearInterval(timer);
                    navigate(`/waitingRoom/${response.data.id}`);
                }
            }, 1000);
        } catch (error) {
            setError('Error al crear la partida');
            console.error(error);
        }
    };

    const copiarAlPortapapeles = (codigo) => {
        navigator.clipboard.writeText(codigo)
            .then(() => {
                setMensajeCopiado(true);
                setTimeout(() => setMensajeCopiado(false), 3000);
            })
            .catch((error) => {
                setError('Error al copiar el código al portapapeles');
                console.error(error);
            });
    };    

    return (
        <div className="code-container">
            <div className='code-box'>
                <h1 className='code-title'>Crear partida privada</h1>
                <p className='code-message'>Ingresa el número de turnos</p>
                <div className="msg">{error}</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="turnos">Número de turnos:</label>
                    <select
                        id="turnos"
                        name="turnos"
                        value={turnos}
                        onChange={(e) => setTurnos(Number(e.target.value))}
                    >
                        <option value="3">5</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <button type="submit">Crear partida</button>
                </form>

                {partida && (
                    <div className="partida-info">
                        <p className='code-message'>Código de la partida: {partida.codigo}</p>
                        {mensajeCopiado && <p className='code-message'>Código copiado al portapapeles</p>}
                        <p className='code-message'>Serás redirigido a la sala de espera en {contador} segundos...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Code;

    
    
        