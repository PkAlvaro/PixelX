import React, { useEffect, useState } from 'react';
import Board from './Board';
import "/src/assets/styles/game/casa.css";
import axios from 'axios';

const Casa = ({posicion, color, numCasas = 1}) => {
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
        2: {top: '390px', left: `${0 + posicionPlus}px`},
        3: {top: '305px', left: `${0 + posicionPlus}px`},
        5: {top: '130px', left: `${0 + posicionPlus}px`},
        

        7: {top: `${0 + posicionPlus}px`, left: '130px'},
        9: {top: `${0 + posicionPlus}px`, left: '255px'},
        10: {top: `${0 + posicionPlus}px`, left: '320px'},

        12: {top: '170px', left: `${273 + posicionPlus}px`},
        13: {top: '255px', left: `${273 + posicionPlus}px`},
        14: {top: '335px', left: `${273 + posicionPlus}px`},

        17: {top: `${365 + posicionPlus}px`, left: '320px'},
        18: {top: `${365 + posicionPlus}px`, left: '255px'},
        20: {top: `${365 + posicionPlus}px`, left: '130px'},
    }

    const className = `casa-container-${color}`;


    return (
        <div className={className} style={posiciones[posicion]}>
        <div className="casa-numero">{numCasas}</div>
        <div className="casa"></div>
    </div>
    );
};

export default Casa;