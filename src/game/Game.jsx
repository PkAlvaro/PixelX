import React, { useEffect, useState, useContext } from 'react';
import Board from './Board';
import Dice from './Dado';
import Ficha from './Ficha';
import Temporizador from '../components/Temporizador';
import CardDisplay from './CardDisplay';
import "/src/assets/styles/game/game.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

const Game = () => {

    const initValues = {cantidadEventosSalirCarcel: 0, color: '', dinero: 0, estado: '', id: 0, id_usuario: 0, posicion: 0, propiedades: [], servicios: [], username: ''};

    const {idPartida} = useParams();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [jugador1, setJugador1] = useState(initValues);
    const [jugador2, setJugador2] = useState(initValues);
    const [jugador3, setJugador3] = useState(initValues);
    const [mostrarDadoMover, setMostrarDadoMover] = useState(() => {
        const savedMostrarDadoMover = localStorage.getItem('mostrarDadoMover');
        return savedMostrarDadoMover ? JSON.parse(savedMostrarDadoMover) : false;
    });
    const [mostrarDadoPartida, setMostrarDadoPartida] = useState(() => {
        const savedMostrarDadoPartida = localStorage.getItem('mostrarDadoPartida');
        return savedMostrarDadoPartida ? JSON.parse(savedMostrarDadoPartida) : true;
    });
    const [jugadores, setJugadores] = useState([initValues, initValues, initValues]);
    const [numTurno, setNumTurno] = useState(0);
    // const [dadosInicio, setDadosInicio] = useState([]);
    const [dadosInicio, setDadosInicio] = useState(JSON.parse(localStorage.getItem('dadosInicio')) || []);

    const [jugadoresSideBar, setJugadoresSideBar] = useState([initValues, initValues, initValues]);

    const [mostrarTemporizador, setMostrarTemporizador] = useState(false);

    const [mostrarCasilla, setMostrarCasilla] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    

    



    const obtenerJugadores = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/info`, {id_partida: idPartida}, 
            {headers: { 'Authorization': `Bearer ${token}` }}
            );
            if (response.status === 401) {
                navigate('/unauthorized');
            }

            console.log("Jugador 2:", jugador2)
            setJugador1(response.data[0]);
            setJugador2(response.data[1]);
            setJugador3(response.data[2]);
            console.log("Jugador 1:", jugador1.id);
            setJugadores([response.data[0], response.data[1], response.data[2]]);
            setJugadoresSideBar([response.data[3], response.data[4], response.data[5]]);



    
        } catch (error) {
            console.error("Error al obtener los jugadores:", error);
        }
    }

    const cambiarTurno = async () => {
        try {
            setNumTurno((numTurno + 1) % 3);
        } catch (error) {
            console.error("Error al cambiar de turno:", error);
        }
    }

    const actualizarOrdenTurnos = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/verificar/orden`, 
        {idPartida: idPartida, dado1: dadosInicio[0], jugador1ID: jugadores[0].id, 
            dado2: dadosInicio[1], jugador2ID: jugadores[1].id, 
            dado3: dadosInicio[2], jugador3ID: jugadores[2].id},
            {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            console.log(response.data);
            obtenerJugadores();
        }).catch((error) => {
            console.error("Error al verificar el orden de los turnos:", error);
        }
        );
    }
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('dadosInicio');
            localStorage.removeItem('mostrarDadoMover');
            localStorage.removeItem('mostrarDadoPartida');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/unauthorized');
            return;
        }
        obtenerJugadores();
    }, []);

    useEffect(() => {
        localStorage.setItem('dadosInicio', JSON.stringify(dadosInicio));
        localStorage.setItem('mostrarDadoMover', JSON.stringify(mostrarDadoMover));
        localStorage.setItem('mostrarDadoPartida', JSON.stringify(mostrarDadoPartida));
    }, [dadosInicio, mostrarDadoMover, mostrarDadoPartida]);

    const moverFicha = (jugadorID, numero) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/mover`, {id_partida: idPartida, id_jugador: jugadorID, cantidad_movimientos: numero},
        {headers: { 'Authorization': `Bearer ${token}` }}
        )
        .then((response) => {
            obtenerJugadores();
            setTimeout(() => {
                setMostrarDadoMover(false);
                setMostrarCasilla(true);
            }, 3000);


            setMostrarTemporizador(true);
            setTimeout(() => {
                cambiarTurno();
                setMostrarTemporizador(false);
                setMostrarCasilla(false);
                setMostrarDadoMover(true);
            }, 10000);
        })
        .catch((error) => {
            console.error("Error al mover la ficha:", error);
        });
    }

    useEffect(() => {
        if (dadosInicio.length === 3) {
            setMostrarDadoPartida(false);
            setMostrarDadoMover(true);
            actualizarOrdenTurnos();
        }
    }, [dadosInicio]);

    return (
        <div className='game-container'>
            <div className='game-content'>
                <div className={`sidebar left-sidebar color-${jugadoresSideBar[0].color}`}>
                    <h3>Usuario: {jugadoresSideBar[0].username}</h3>
                    <div className='avatar-1'></div>
                    <h3>Dinero: {jugadoresSideBar[0].dinero}</h3>
                    <h3>Propiedades:</h3>
                    <ul>
                        {jugadoresSideBar[0].propiedades.length > 0 ? (
                            jugadoresSideBar[0].propiedades.map((propiedad, index) => (
                                <li key={index}>
                                    Renta: {propiedad.renta}, Precio: {propiedad.precio}
                                </li>
                            ))
                        ) : (
                            <li>No tiene propiedades</li>
                        )}
                    </ul>
                    <h3>Servicios:</h3>
                    <ul>
                        {jugadoresSideBar[0].servicios.length > 0 ? (
                            jugadoresSideBar[0].servicios.map((servicio, index) => (
                                <li key={index}>
                                    Renta: {servicio.renta}, Precio: {servicio.precio}
                                </li>
                            ))
                        ) : (
                            <li>No tiene servicios de tren</li>
                        )}
                    </ul>
                    <h3>Suerte:</h3>
                    <h4>Cartas de salir de la carcel: x{jugadoresSideBar[0].cantidadEventosSalirCarcel}</h4>

                    

                    
                </div>
                <div className='main-content'>
                    {/* <div className='title'>
                        <h3>Game</h3>
                    </div> */}
                    <Board jugadores={jugadores}/>
                    { mostrarTemporizador && (
                        <Temporizador/>
                    )}
                    
                </div>
                <div className={`sidebar right-sidebar color-${jugadoresSideBar[1].color}-${jugadoresSideBar[2].color} space-between`}>
                    <div>
                        <h3>Usuario: {jugadoresSideBar[1].username}</h3>
                        <div className='avatar-2'></div>
                        <h3>Dinero: {jugadoresSideBar[1].dinero}</h3>
                        <h3>Propiedades: {jugadoresSideBar[1].propiedades.length}</h3>
                        <h3>Servicios de tren: {jugadoresSideBar[1].servicios.length}</h3>
                        <h3>Suerte: {jugadoresSideBar[1].cantidadEventosSalirCarcel}</h3>
                    </div>
                    <div>
                        <h3>Usuario: {jugadoresSideBar[2].username}</h3>
                        <div className='avatar-3'></div>
                        <h3>Dinero: {jugadoresSideBar[2].dinero}</h3>
                        <h3>Propiedades: {jugadoresSideBar[2].propiedades.length}</h3>
                        <h3>Servicios de tren: {jugadoresSideBar[2].servicios.length}</h3>
                        <h3>Suerte: {jugadoresSideBar[2].cantidadEventosSalirCarcel}</h3>
                    </div>
                </div>
            </div>
            { mostrarDadoMover && (
                <Dice onRoll={(numero) => {
                    moverFicha(jugadores[numTurno].id, numero);
                }
                }/>
            )}
            
            { mostrarDadoPartida && 
            (

                <Dice onRoll={(numero) => {
                    
                    console.log("Numero:", numero);
                    console.log("bool", numero in dadosInicio)
                    if (dadosInicio.includes(numero)){
                        console.log("El numero ya fue lanzado, lanza otra vez");
                        return;
                    } else {
                        setDadosInicio([...dadosInicio, numero]);
                        // dadosInicio.push(numero);
                        cambiarTurno();
                    }
                    if (dadosInicio.length === 2){
                        setDadosInicio([...dadosInicio, numero]);
                        setTimeout(() => {
                            setMostrarDadoPartida(false);
                            setMostrarDadoMover(true);
                            // actualizarOrdenTurnos();
                        }, 5000); // Aquí ajusta el tiempo en milisegundos (1000 ms = 1 segundo)

                        return;
                        // Hago el post para verificar orden de turnos
                    }
                    console.log("largo :", dadosInicio.length);
                    console.log("Dados:", dadosInicio);
                }} />
            )}
            { mostrarCasilla && (
                <CardDisplay index={jugadores[numTurno].posicion}/>
            )
            }
            <h3 className='h1-dice-text'>Turno de {jugadores[numTurno].username}</h3>
        </div>
    );
};

export default Game;