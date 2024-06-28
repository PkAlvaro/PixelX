import React, { useState, useEffect } from 'react';
import Card from "./Card";
import "/src/assets/styles/game/board.css";
import axios from 'axios';
import Ficha from './Ficha';
import Casa from './Casa';
import Tren from './Tren';

function Board({jugadores, propiedad_casa, propiedad_tren}) {

    const [cards, setCards] = useState([{id: 1, imagen: '', mensaje: ''}]);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);



    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/casillas/`, {headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => {
                const data = response.data;
                setCards(data);
            }).catch((error) => {
                console.error("Error al obtener las casillas:", error);
            });
    }, []);



    return (
        <div className="board-container">
            <div className="board">
                {cards.map((card, index) => (
                    <Card key={card.id} imgSrc={card.imagen} index={index} />
                ))}
                {jugadores.map((jugador, index) => (
                    <Ficha key={index} posicion={jugador.posicion} color={jugador.color}/>
                ))}
                 {propiedad_casa.map((propiedad) => (
                    propiedad.propiedades.map((casilla, index) => (
                        <Casa 
                            key={`${propiedad.id_jugador}-${index}`} 
                            posicion={casilla[0]} 
                            numCasas={casilla[1]} 
                            color={jugadores.find(j => j.id === propiedad.id_jugador)?.color || 'defaultColor'} 
                        />
                    ))
                ))}
                {propiedad_tren.map((propiedad) => (
                    propiedad.servicios.map((casilla, index) => (
                        <Tren 
                            key={`${propiedad.id_jugador}-${index}`} 
                            posicion={casilla[0]} 
                            numTrenes={casilla[1]} 
                            color={jugadores.find(j => j.id === propiedad.id_jugador)?.color || 'defaultColor'} 
                        />
                    ))
                ))}
            </div>
        </div>
    )
}

export default Board;
         