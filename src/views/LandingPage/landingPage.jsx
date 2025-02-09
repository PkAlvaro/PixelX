import React, { useEffect } from 'react';
import { useState } from 'react';
import "/src/assets/styles/LandingPage/landingPage.css";

function LandingPage() {

    const [logeado, setLogeado] = useState(false);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        localStorage.removeItem('numTurno')
        localStorage.removeItem('dadosInicio');
        localStorage.removeItem('mostrarDadoMover');
        localStorage.removeItem('mostrarDadoPartida');
        localStorage.removeItem('enBancarrota');
        
        if (token && token !== 'null') {
            setLogeado(true);
        }
    }
    , [token]);

    return (
        <>
            <div className='buttons'>
                {logeado && (
                    <>
                        
                        <a className='button' href='/join'>Unirse a Partida</a>
                        <a className='button' href='/code'>Crear Partida Privada</a>
                        <a className='button' href='/ranking'>Ranking</a>
                        
                    </>
                )}
                {!logeado && (
                    <>
                        <a className='button' href='/login'>Ingresar</a>
                        <a className='button' href='/register'>Crear Usuario</a>
                    </>
                )}
                <a className='button' href='/aboutus'>Nosotros</a>
                <a className='button' href='/instructions'>Instrucciones</a>
                


            </div>
        </>
    );
}

export default LandingPage;