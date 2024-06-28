import React, { useEffect, useState } from 'react';
import Board from './Board';
import "/src/assets/styles/game/ficha.css";
import axios from 'axios';

const Ficha = ({posicion, color}) => {
    const [fichas, setFichas] = useState([]);
    const posicionFicha = posicion;
    let posicionPlus = 0;
    if (color === 'rojo'){
        posicionPlus = 40;
    } else if (color === 'verde'){
        posicionPlus = 80;
    }
    
    // 0 0 el sexto
    const posiciones = {
        1: {top: `${475 + posicionPlus}px`, left: `${0 + posicionPlus}px`},
        2: {top: '400px', left: `${0 + posicionPlus}px`},
        3: {top: '320px', left: `${0 + posicionPlus}px`},
        4: {top: '235px', left: `${0 + posicionPlus}px`},
        5: {top: '150px', left: `${0 + posicionPlus}px`},
        6: {top: `${0 + posicionPlus}px`, left: `${0 + posicionPlus}px`},

        7: {top: `${0 + posicionPlus}px`, left: '130px'},
        8: {top: `${0 + posicionPlus}px`, left: '195px'},
        9: {top: `${0 + posicionPlus}px`, left: '255px'},
        10: {top: `${0 + posicionPlus}px`, left: '320px'},
        11: {top: `${0 + posicionPlus}px`, left: `${370 + posicionPlus}px`},

        12: {top: '150px', left: `${370 + posicionPlus}px`},
        13: {top: '235px', left: `${370 + posicionPlus}px`},
        14: {top: '320px', left: `${370 + posicionPlus}px`},
        15: {top: '400px', left: `${370 + posicionPlus}px`},
        16: {top: `${475 + posicionPlus}px`, left: `${370 + posicionPlus}px`},

        17: {top: `${475 + posicionPlus}px`, left: '320px'},
        18: {top: `${475 + posicionPlus}px`, left: '255px'},
        19: {top: `${475 + posicionPlus}px`, left: '195px'},
        20: {top: `${475 + posicionPlus}px`, left: '130px'},
    }

    const className = `ficha-container-${color}`;

    return (
        <div className={className} style = {posiciones[posicion]}>
            <div className="ficha"></div>
        </div>
    );
};

export default Ficha;