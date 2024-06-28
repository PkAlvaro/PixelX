import axios from "axios";
import "../assets/styles/game/cardDisplay.css";
import React, { useEffect, useState } from 'react';

function CardDisplay({ index }) {

    const [className, setClassName] = useState('img-display');
    const [containerClassName, setContainerClassName] = useState('card-display-container');
    const [imgSrc, setImgSrc] = useState('');
    const [mostrarBotones, setMostrarBotones] = useState(true);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);

    const obtenerImagen = (index) => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/casillas/${index}`, {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            const data = response.data;
            console.log(data);
            setImgSrc(data.imagen);
        }).catch((error) => {
            console.error("Error al obtener las casillas:", error);
        });
    }


    useEffect(() => {
        if ([2, 3, 4, 5].includes(index)) {
            setClassName('img-display-rotated rotate-left');
            setContainerClassName('card-display-container-rotated');
            if (index === 4) {
                setMostrarBotones(false)
            }
        } else if ([12, 13, 14, 15].includes(index)) {
            setClassName('img-display-rotated rotate-right');
            setContainerClassName('card-display-container-rotated');
            if (index === 15) {
                setMostrarBotones(false)
            }
        } else if ([1, 6, 11, 16].includes(index)) {
            setMostrarBotones(false)
            setClassName("img-display-corner")
        } else if ([8, 19].includes(index)) {
            setMostrarBotones(false)
        }

        obtenerImagen(index);
        console.log(imgSrc)
    }, [index, imgSrc]);

    return (
        <div className={containerClassName}>
            <div className="single-card-container">
                <img src={imgSrc} className={className} alt="CardDisplay"/>
            </div>
            { mostrarBotones && (
            <div className="button-container-display">
                <button className="button-card-display">Comprar</button>
                <button className="button-card-display">Vender</button>
            </div>
            )}
        </div>
    );
}

export default CardDisplay;
