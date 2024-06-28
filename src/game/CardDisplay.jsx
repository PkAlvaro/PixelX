import axios from "axios";
import "../assets/styles/game/cardDisplay.css";
import React, { useEffect, useState } from 'react';

function CardDisplay({ index, partidaId, jugadorId, obtenerjugadores, compraRealizada, setCompraRealizada, ventaRealizada, setVentaRealizada}) {

    const [className, setClassName] = useState('img-display');
    const [containerClassName, setContainerClassName] = useState('card-display-container');
    const [imgSrc, setImgSrc] = useState('');
    const [mostrarBotones, setMostrarBotones] = useState(true);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    const [mostrarComprar, setMostrarComprar] = useState(true);
    const [mostrarVender, setMostrarVender] = useState(false);
   

    useEffect(() => {
        obtenerjugadores();
    }
    , []);

    const obtenerImagen = (index) => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/casillas/${index}`, {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            const data = response.data;
            setImgSrc(data.imagen);
        }).catch((error) => {
            console.error("Error al obtener las casillas:", error);
        });
    }

    const comprarCasilla = (jugadorId, partidaId, index) => {
        if (!compraRealizada) {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/comprar`, 
            {id_jugador: jugadorId, 
            id_casilla: index,
            id_partida: partidaId},
            {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            console.log(response);
            obtenerjugadores();
            setCompraRealizada(true);
            
        }
        ).catch((error) => {
            console.error("Error al comprar la casilla:", error);
        });
    }
    }

    const venderCasilla = (jugadorId, partidaId, index) => {
        if (!ventaRealizada) {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/vender`,
            {id_jugador: jugadorId, 
            id_casilla: index,},
            {headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            console.log(response.data);
            obtenerjugadores();
            setVentaRealizada(true);
         
        }
        ).catch((error) => {
            console.error("Error al vender la casilla:", error);
        });
    }
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
    }, [index, imgSrc]);

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/check/owner`, {
            id_jugador: jugadorId,
            id_casilla: index,
            id_partida: partidaId
        } ,{headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            const data = response.data;

            if (data.otherOwner) {
                setMostrarComprar(false);
                setMostrarVender(false);
            } else if (!data.owner) {
                if (data.canBuy) {
                    setMostrarComprar(true);
                    setMostrarVender(false);
                } else {
                    setMostrarComprar(false);
                    setMostrarVender(false);
                }
            } else if (data.owner && data.numCasas < 4 && data.canBuy) {
                setMostrarComprar(true);
                setMostrarVender(true);
            } else if (data.owner && data.numCasas === 4) {
                setMostrarComprar(false);
                setMostrarVender(true);

            }
        }).catch((error) => {
            console.error("Error al obtener las casillas:", error);
        });
    }, [index]);


    return (
        <div className={containerClassName}>
            <div className="single-card-container">
                <img src={imgSrc} className={className} alt="CardDisplay"/>
            </div>
            { mostrarBotones && (
            <div className="button-container-display">
                {mostrarComprar && <button className="button-card-display" onClick={() => comprarCasilla(jugadorId, partidaId, index)}>Comprar</button>}
                {mostrarVender && <button className="button-card-display" onClick={() => venderCasilla(jugadorId, partidaId, index)}>Vender</button>}
            </div>
            )}
        </div>
    );

}


export default CardDisplay;
