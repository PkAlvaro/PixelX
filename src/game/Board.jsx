import React, { useState, useEffect } from 'react';
import Card from "./Card";
import "/src/assets/styles/game/board.css";
import axios from 'axios';
import Ficha from './Ficha';

function Board({jugadores}) {
    // const cards = [
    //     { id:1, imgSrc: "/src/assets/imgs/Casillas/casilla_1.PNG" },
    //     { id:2, imgSrc: "/src/assets/imgs/Casillas/casilla_2.PNG" },
    //     { id:3, imgSrc: "/src/assets/imgs/Casillas/casilla_3.PNG" },
    //     { id:4, imgSrc: "/src/assets/imgs/Casillas/casilla_4.PNG" },
    //     { id:5, imgSrc: "/src/assets/imgs/Casillas/casilla_5.PNG" },
    //     { id:6, imgSrc: "/src/assets/imgs/Casillas/casilla_6.PNG" },
    //     { id:7, imgSrc: "/src/assets/imgs/Casillas/casilla_7.PNG" },
    //     { id:8, imgSrc: "/src/assets/imgs/Casillas/casilla_8.PNG" },
    //     { id:9, imgSrc: "/src/assets/imgs/Casillas/casilla_9.PNG" },
    //     { id:10, imgSrc: "/src/assets/imgs/Casillas/casilla_10.PNG" },
    //     { id:11, imgSrc: "/src/assets/imgs/Casillas/casilla_11.PNG" },
    //     { id:12, imgSrc: "/src/assets/imgs/Casillas/casilla_12.PNG"},
    //     { id:13, imgSrc: "/src/assets/imgs/Casillas/casilla_13.PNG" },
    //     { id:14, imgSrc: "/src/assets/imgs/Casillas/casilla_14.PNG" },
    //     { id:15, imgSrc: "/src/assets/imgs/Casillas/casilla_15.PNG" },  
    //     { id:16, imgSrc: "/src/assets/imgs/Casillas/casilla_16.PNG"},
    //     { id:17, imgSrc: "/src/assets/imgs/Casillas/casilla_17.PNG" },
    //     { id:18, imgSrc: "/src/assets/imgs/Casillas/casilla_18.PNG" },
    //     { id:19, imgSrc: "/src/assets/imgs/Casillas/casilla_19.PNG" },
    //     { id:20, imgSrc: "/src/assets/imgs/Casillas/casilla_20.PNG"}
    // ];

    const [cards, setCards] = useState([{id: 1, imagen: '', mensaje: ''}]);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/casillas/`, {headers: { 'Authorization': `Bearer ${token}` }})
            .then((response) => {
                const data = response.data;
                console.log(data);
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
                {
                    jugadores.map((jugador, index) => (
                        <Ficha key={index} posicion={jugador.posicion} color={jugador.color}/>
                    ))
                }
                {/* <Ficha posicion={1}/> */}
            </div>
        </div>
    )
}

export default Board;
         