import React, { useEffect, useState } from 'react';
import "/src/assets/styles/game/tren.css";
import axios from 'axios';

const Tren = ({posicion, color, numTrenes = 1}) => {
    const posicionCasa = posicion;
    let posicionPlus = 0;
    if (color === 'rojo'){
        posicionPlus = 93;
    } else if (color === 'verde'){
        posicionPlus = 93;
    } else if (color === 'morado'){
        posicionPlus = 93;
    }
    
    // 0 0 el sexto
    const posiciones = {
   
        10: {top: `${24 + posicionPlus}px`, left: '320px'},

        18: {top: `${335 + posicionPlus}px`, left: '255px'},
        
    }

    const className = `tren-container-${color}`;


    return (
        <div className={className} style={posiciones[posicion]}>
        <div className="tren-numero">{numTrenes}</div>
        <div className="tren"></div>
    </div>
    );
};

export default Tren;