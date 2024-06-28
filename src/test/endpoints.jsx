import React, { useEffect } from 'react';
import { useState } from 'react';
import "../assets/styles/test/mainPage.css";

function Endpoints() {


    return (
        <div className='test-page'>
            <div className='endpoints-container'>
                <h1>Endpoints</h1>
                <div className='button-container-test'>
                    <a className='button' href='/comprarPropiedad'>Comprar Propiedad</a>
                    <a className='button' href='/comprarCasas'>Comprar Casas</a>
                    <a className='button' href='/pagarRenta'>Pagar Renta</a>
                    <a className='button' href='/pagarImpuesto'>Pagar Impuesto</a>
                </div>
            </div>
        </div>
    );

}

export default Endpoints;