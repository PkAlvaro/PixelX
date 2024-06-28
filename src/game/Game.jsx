import React, { useEffect, useState, useContext, act } from 'react';
import Board from './Board';
import Dice from './Dado';
import Ficha from './Ficha';
import Temporizador from '../components/Temporizador';
import CardDisplay from './CardDisplay';
import "/src/assets/styles/game/game.css";
import axios from 'axios';
import { useParams, useNavigate, useLocation, json } from 'react-router-dom';
import { GameContext } from '../context/GameContext.jsx';


const Game = () => {
    const initValues = {cantidadEventosSalirCarcel: 0, color: '', dinero: 0, estado: '', id: 0, id_usuario: 0, posicion: 0, propiedades: [], servicios: [], username: ''};

    const { idPartida } = useParams();
    const { isInGame, setIsInGame, gameId, setGameId } = useContext(GameContext);
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
    const [enBancarrota, setEnBancarrota] = useState(() => {
        const savedBancarrota = localStorage.getItem('enBancarrota');
        return savedBancarrota ? JSON.parse(savedBancarrota) : false;
    });

    const [jugadores, setJugadores] = useState([initValues, initValues, initValues]);
    // const [numTurno, setNumTurno] = useState(0);
    const [numTurno, setNumTurno] = useState(0);
    const [dadosInicio, setDadosInicio] = useState(JSON.parse(localStorage.getItem('dadosInicio')) || []);
    const [jugadoresSideBar, setJugadoresSideBar] = useState([initValues, initValues, initValues]);
    const [mostrarTemporizador, setMostrarTemporizador] = useState(false);
    const [mostrarCasilla, setMostrarCasilla] = useState(false);
    const [turnosRestantes, setTurnosRestantes] = useState(0);
    const [ resetDado, setResetDado ] = useState(true);
    const [playerID, setPlayerID] = useState(0);
    const [dadosInicio2, setDadosInicio2] = useState([]);
    const [dadoRepetido, setDadoRepetido] = useState(false);
    const [propiedades_casa, setPropiedades_casa] = useState([]);
    const [propiedades_tren, setPropiedades_tren] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [ganador, setGanador] = useState(0);
    const [mostrarBotonVolver, setMostrarBotonVolver] = useState(false);
    const [enCarcel, setEnCarcel] = useState(false);
    const [partidaTerminada, setPartidaTerminada] = useState(false);
    const [compraRealizada, setCompraRealizada] = useState(false);
    const [ventaRealizada, setVentaRealizada] = useState(false);
    const [turnoCambiado, setTurnoCambiado] = useState(false);

    const navigate = useNavigate();
    const location = useLocation(); // Despues borrar esto

    const casillaNombres = {
        1: 'Partida',   
        2: 'Estación Central',
        3: 'Franklin',
        4: 'Suerte',
        5: 'Algarrobo',
        6: 'Cárcel',
        7: 'El Tabo',
        8: 'Suerte',
        9: 'Valparaiso',
        10: 'Tren Limache',
        11: 'Impuestos',
        12: 'Viña del Mar',
        13: 'La Serena',
        14: 'Rapa Nui',
        15: 'Suerte',
        16: 'Estás en Cárcel',  
        17: 'Chiloe',
        18: 'Bio Tren', 
        19: 'Suerte',
        20: 'Antartida',
    };
    
    useEffect(() => {
        if (!token) {
            navigate('/unauthorized');
            return;
        }
        // if (!isInGame || !gameId || gameId !== idPartida) {
        //     navigate('/');
        //     return;
        // }
        setIsInGame(true);
        setGameId(idPartida);
        obtenerJugadores();

        // return () => {
        //     setIsInGame(false);
        //     setGameId(null);
        // }
    }, [token, idPartida, navigate, isInGame, gameId, setIsInGame, setGameId]);

    
// Obtener jugadores

    const obtenerJugadores = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/info`, {id_partida: idPartida}, 
            {headers: { 'Authorization': `Bearer ${token}` }}
            );
            if (response.status === 401) {
                navigate('/unauthorized');
            }
            setJugador1(response.data[0]);
            setJugador2(response.data[1]);
            setJugador3(response.data[2]);
            setJugadores([response.data[0], response.data[1], response.data[2]]);
            setJugadoresSideBar([response.data[3], response.data[4], response.data[5]]);
            setTurnosRestantes(response.data[6]);
            if (response.data[7]) { 
                setDadosInicio2(response.data[7].split(',')); 
            }
            setNumTurno(response.data[8]);
            setPropiedades_casa(response.data[9]);
            setGameStarted(response.data[10]);
            setPropiedades_tren(response.data[11]);
            getID();


            for (let i = 0; i < 3; i += 1) {
                if (response.data[i].dinero < 0 && !enBancarrota && response.data[i].id_usuario === playerID) {
                    bancarrota();
                    // cambiarTurno();
                    setMostrarBotonVolver(true);
                    setMostrarDadoMover(false);
                    setEnBancarrota(true);
                    return;
                }
            }
        } catch (error) {
            console.error("Error al obtener los jugadores:", error);
        }
    }

    const getID = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/usuarios/get/id`, {}, {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            setPlayerID(response.data.id);
        }).catch((error) => {
            console.error("Error al obtener el id del jugador:", error);
        });
    }

    useEffect(() => {
        setTimeout(() => {
            obtenerJugadores();
        }, 3000);
    }, [obtenerJugadores]);
// Cambiar turno de jugador

    const actualizarTurno = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/change/turn`, {id_partida: idPartida},
        {headers: { 'Authorization': `Bearer ${token}` }}
        )
        .then((response) => {
        })
        .catch((error) => {
            console.error("Error al actualizar el turno:", error);
        });
    }

    const cambiarTurno = async () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/cambiar/turno`, {idPartida: idPartida},
        {headers: { 'Authorization': `Bearer ${token}` }}
        ).then((response) => {
            if (numTurno === 2 && gameStarted) {
                actualizarTurno();
            }
            setTurnoCambiado(false);
            setCompraRealizada(false);
            setVentaRealizada(false);
        }).catch((error) => {
            console.error("Error al cambiar de turno:", error);
        });
    }

// Actualizar orden de los turnos

    const actualizarOrdenTurnos = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/verificar/orden`, 
        {idPartida: idPartida,
            dado1: dadosInicio2[0], jugador1ID: dadosInicio2[1], 
            dado2: dadosInicio2[2], jugador2ID: dadosInicio2[3], 
            dado3: dadosInicio2[4], jugador3ID: dadosInicio2[5]},
            {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            console.log(response.data);
            obtenerJugadores();
        }).catch((error) => {
            console.error("Error al verificar el orden de los turnos:", error);
        }
        );
    }

// Guardar en local storage

    useEffect(() => {
        // localStorage.setItem('dadosInicio', JSON.stringify(dadosInicio)); // 

        localStorage.setItem('mostrarDadoMover', JSON.stringify(mostrarDadoMover));
        localStorage.setItem('mostrarDadoPartida', JSON.stringify(mostrarDadoPartida));
        localStorage.setItem('enBancarrota', JSON.stringify(enBancarrota));
        // localStorage.setItem('numTurno', JSON.stringify(numTurno));
    }, [dadosInicio, mostrarDadoMover, mostrarDadoPartida, numTurno, enBancarrota]);

// Cobrar renta
    const cobrarRenta = (numero) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/pagar/renta`, 
            {id_partida: idPartida, id_jugador: jugadores[numTurno].id, id_casilla: numero},
            {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            if (response.data.hasRent) {
                // añadir popUP
                obtenerJugadores();
                setTimeout(() => {
                    window.alert(`Has pagado una de renta de $${response.data.monto}`);
                } , 1000);
            }
        }).catch((error) => {
            console.error("Error al cobrar la renta:", error);
        });
    }

// Pagar impuesto NO FUNCIONA AUN   

const pagarImpuesto = async (jugadorID, idPartida, casillaID) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/pagar/impuesto/${casillaID}`, {
            id_partida: idPartida,
            id_jugador: jugadorID,
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 200) {
            // Mostrar mensaje de éxito o hacer alguna acción
            obtenerJugadores();
            setTimeout(() => {
                window.alert(`Has pagado un impuesto de $150`);
            }, 1000);
        } else {
            // Manejo de errores del backend
            console.error("Error al pagar el impuesto:", response.data);
        }
    } catch (error) {
        // Manejo de errores de red o conexión
        console.error("Error al pagar el impuesto:", error);
    }
};


// Manejar eventos de suerte

const obtenerEventoAleatorio = async (casillaID, jugadorID) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/aleatorio`, {
            id_casilla: casillaID,
            id_jugador: jugadorID,
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 200) {
            obtenerJugadores();
            setTimeout(() => {
                if (response.data.tipo === 'SalirCarcel') {
                    window.alert("Has obtenido una carta para salir de la cárcel");
                }
                if (response.data.tipo === 'Bonificacion') {
                    window.alert(`Has obtenido una bonificación de ${response.data.monto}`);
                }
                if (response.data.tipo === 'Retroceso') {
                    window.alert(`Has retrocedido ${response.data.num_casillas} casillas`);
                }
                if (response.data.tipo === 'BonusAvance') {
                    window.alert(`Has avanzado ${response.data.cantidad_aumentada} casillas`);
                }
                if (response.data.tipo === 'Multa') {
                    window.alert(`Has pagado una multa de ${response.data.monto}`);
                }
            }, 1000);
        }

    } catch (error) {
        console.error("Error al obtener el evento aleatorio:", error);
    }
};


    
// Mover ficha de jugador y cobrar renta e impuestos

    const moverFicha = (jugadorID, numero) => {

        if (enCarcel) {
            if (numero === 6 || numero === 1) {
                salirCarcel(jugadorID, numero);
                if (jugadores[(numTurno + 1) % 3].estado === 'bancarrota') {
                    cambiarTurno();
                    setTimeout(() => {
                        cambiarTurno();
                    }, 1000);
                } else {
                    cambiarTurno();
                }
                setResetDado(true);
            }
            else {
                window.alert(`Sacaste un ${numero}, no puedes salir de la cárcel`);
                if (jugadores[(numTurno + 1) % 3].estado === 'bancarrota') {
                    cambiarTurno();
                    setTimeout(() => {
                        cambiarTurno();
                    }, 1000);
                } else {
                    cambiarTurno();
                }
                setResetDado(true);
            }
            return;
        }


        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/mover`, {id_partida: idPartida, id_jugador: jugadorID, cantidad_movimientos: numero},
        {headers: { 'Authorization': `Bearer ${token}` }}
        )
        .then((response) => {

            const oldPos = jugadores[numTurno].posicion;
            const newPos = response.data.posicion;

            if (oldPos > newPos && newPos <= 5) {
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/sumarinicio`, {
                    id_partida: idPartida, 
                    id_jugador: jugadorID},
                    {headers: { 'Authorization': `Bearer ${token}` }
                })
                .then((response) => {
                    window.alert("Has pasado por la casilla de inicio, recibes $100");
                    obtenerJugadores();
                }
                ).catch((error) => {
                    console.error("Error al sumar al pasar por la casilla de inicio:", error);
                }
                );
            }

            setResetDado(false);
            obtenerJugadores();
            setTimeout(() => {
                setMostrarDadoMover(false);
                setMostrarCasilla(true);
            }, 3000);

            // VER COMO ARREGLAR IMPUESTOS
            // const posicion = jugadores[numTurno].posicion + numero; //22
            const posicion = response.data.posicion;


            if (posicion === 11) {
                // IMPUESTOS
                pagarImpuesto(jugadorID, idPartida, posicion);
            }
          
            // Eventos Aleatorios
            if ([4, 8, 15, 19].includes(posicion)) {
                obtenerEventoAleatorio(posicion, jugadorID);
            }

            if (posicion === 6) {
                enviarACarcel(jugadorID);
                return;
            }

            setMostrarTemporizador(true);
            cobrarRenta(response.data.posicion);

            setTimeout(() => {
                if (jugadores[(numTurno + 1) % 3].estado === 'bancarrota') {
                    cambiarTurno();
                    setTimeout(() => {
                        cambiarTurno();
                    }, 1000);
                } else {
                    cambiarTurno();
                }
                setMostrarTemporizador(false);
                setMostrarCasilla(false);
                setMostrarDadoMover(true);
                setResetDado(true);
            }, 10000);
        })
        .catch((error) => {
            console.error("Error al mover la ficha:", error);
        });
    }

    const enviarACarcel = (jugadorID) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/carcel`, {id_jugador: jugadorID},
        {headers: { 'Authorization': `Bearer ${token}` }}
        )
        .then((response) => {
            obtenerJugadores();
            setEnCarcel(true);
            if (response.data.luck) {
                window.alert(response.data.message)
                setEnCarcel(false);
            } else {
                window.alert("Has sido enviado a la cárcel");
            }
            setTimeout(() => {
                if (jugadores[(numTurno + 1) % 3].estado === 'bancarrota') {
                    cambiarTurno();
                    setTimeout(() => {
                        cambiarTurno();
                    }, 1000);
                } else {
                    cambiarTurno();
                }
                setMostrarCasilla(false);
                setMostrarDadoMover(true);
                setResetDado(true);
            }, 4000);
        })
        .catch((error) => {
            console.error("Error al enviar a la cárcel:", error);
        });
    }

    const salirCarcel = (jugadorID, numero) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/free`, {id_jugador: jugadorID},
        {headers: { 'Authorization': `Bearer ${token}` }}
        )
        .then((response) => {
            obtenerJugadores();
            setEnCarcel(false);
            setTimeout(() => {
                window.alert(`Sacaste un ${numero}, Has salido de la cárcel`);
            }, 1000);
        })
        .catch((error) => {
            console.error("Error al salir de la cárcel:", error);
        });
    }


    // useEffect(() => {
    //     if (dadosInicio.length === 3 && mostrarDadoPartida) {
    //         setMostrarDadoPartida(false);
    //         setMostrarDadoMover(true);
    //         actualizarOrdenTurnos();
    //     }
    // }, [dadosInicio]);

    useEffect(() => {

        if (dadosInicio2.length === 6 && mostrarDadoPartida) {
            setMostrarDadoPartida(false);
            setMostrarDadoMover(true);
            actualizarOrdenTurnos();
        }
    }, [dadosInicio2]);

    useEffect(() => {
        if (dadoRepetido) {
            setResetDado(false);
            // refresh de la página
            window.location.reload();
            window.alert("El número ya fue lanzado, lanza otra vez");
            setDadoRepetido(false);
        }
    }, [dadoRepetido]);

    const anadirDado = (numero) => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/anadir`, {idPartida: idPartida, idJugador: jugadores[numTurno].id, numero: numero},
            {headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.error("Error al añadir el dado:", error);
            });
    }

    const empezarPartida = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/start`, {idPartida: idPartida},
            {headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => {
                console.log(response.data);
                obtenerJugadores();
            }).catch((error) => {
                console.error("Error al empezar la partida:", error);
            });
    }

    useEffect(() => {
        if (turnosRestantes === 0 && !partidaTerminada) {
            setMostrarDadoMover(false);
            terminarPartida();
        }
    }, [turnosRestantes, partidaTerminada]);

    const terminarPartida = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/ganador`, 
            {idPartida: idPartida,
                jugadoresID: [jugadores[0].id, jugadores[1].id, jugadores[2].id],
            },
            {headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => {
                setGanador(response.data.ganador);
                //pop up
                setTimeout(() => {
                    window.alert(`El ganador es: ${response.data.ganador}`);
                    setPartidaTerminada(true);
                    setMostrarBotonVolver(true);
                }, 1000);
            }).catch((error) => {
                console.error("Error al terminar la partida:", error);
            }
        );
    }

    const bancarrota = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/bancarrota`, { id_jugador: jugadores[numTurno].id },
            {headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => {
                console.log(response.data);
                obtenerJugadores();
            }).catch((error) => {
                console.error("Error al declarar bancarrota:", error);
            });
    }
    

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
                                    {casillaNombres[propiedad.id_casilla]} - Renta: {propiedad.renta}, Precio: {propiedad.precio}
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
                                    {casillaNombres[servicio.id_casilla]} - Renta: {servicio.renta}, Precio: {servicio.precio}
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
                    <h2>Turnos restantes: {turnosRestantes}</h2>
                    <Board jugadores={jugadores} propiedad_casa={propiedades_casa} propiedad_tren={propiedades_tren}  />
                    { mostrarBotonVolver && (
                        <button onClick={() => navigate('/')} className='volver-btn'>Volver al inicio</button>
                    )
                    }
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
            { mostrarDadoMover && jugadores[numTurno].id_usuario === playerID && !enBancarrota && (
                <Dice onRoll={(numero) => {
                    moverFicha(jugadores[numTurno].id, numero);
                }
                }/>
            )}
            
            { mostrarDadoPartida && jugadores[numTurno].id_usuario === playerID &&
            (

                <Dice onRoll={(numero) => {
                    
                    let auxDados = [];
                    
                    for (let i = 0; i < dadosInicio2.length; i += 2) {
                        auxDados.push(Number(dadosInicio2[i]));
                    }

                    if (auxDados.includes(numero)){
                        setDadoRepetido(true);
                        return;
                    } else {
                        // setDadosInicio([...dadosInicio, numero]);

                        // NUEVA LOGICA
                        anadirDado(numero);

                        // hacer un timer para que se muestre el dado
                        setTimeout(() => {
                            if (auxDados.length === 2){
                                // setDadosInicio([...dadosInicio, numero]);
                                // anadirDado(numero);
                                
                                // setMostrarDadoPartida(false);
                                setTimeout(() => {
                                    setMostrarDadoMover(true);
                                }, 2000);
                                // actualizarOrdenTurnos();
    
                                 // Aquí ajusta el tiempo en milisegundos (1000 ms = 1 segundo)
                                // Hago el post para verificar orden de turnos
                            }
                            obtenerJugadores();



                            if (jugadores[(numTurno + 1) % 3].estado === 'bancarrota') {
                                cambiarTurno();
                                setTimeout(() => {
                                    cambiarTurno();
                                }, 1000);
                            } else {
                                cambiarTurno();
                            }
                            if (auxDados.length === 2){
                                empezarPartida();
                            }
                        }, 2000);

                    }
                }} reset={resetDado} />
            )}
            { mostrarCasilla && (
                <CardDisplay 
                index={jugadores[numTurno].posicion} 
                partidaId={idPartida} 
                jugadorId={jugadores[numTurno].id}
                obtenerjugadores={obtenerJugadores}
                compraRealizada={compraRealizada}
                setCompraRealizada={setCompraRealizada}
                ventaRealizada={ventaRealizada}
                setVentaRealizada={setVentaRealizada}
                />
            )}
            <h3 className='h1-dice-text'>Turno de {jugadores[numTurno].username}</h3>
        </div>
    );
};

export default Game;