import React from "react";
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/instructions/instructions.css";

function Instructions() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/'); 
    };

    return (
        <div className="instructions-page">
            <div className="instructions-container">
                <h2 className="title">Instrucciones del Juego</h2>
                <div className="section">
                    <h3 className="subtitle">1. Pre-partida</h3>
                    <div className="subrules-container">
                        <p>a.</p>
                            <p className="prepartida-description"> Antes de comenzar, se deben establecer la cantidad de turnos a jugar.</p>
                        <p>b.</p>
                            <p className="prepartida-description"> Al ingresar al juego, cada jugador recibe una ficha de un color aleatorio y $1000.</p>
                        <p>c.</p>
                            <p className="prepartida-description"> Para decidir quién comienza, cada jugador lanza un dado.</p>
                    </div>
                </div>
                <div className="section">
                    <h3 className="subtitle">2. Partida</h3>
                    <div className="subrules-container">
                        <p>a. Casilla Partida:</p>
                        <p className="instruction-description">- Los jugadores comienzan el juego aquí y reciben $100 cada vez que pasan por esta casilla.</p>
                        <p>b. Comprar Propiedades:</p>
                        <p className="instruction-description">- Los jugadores pueden comprar propiedades o servicios si tienen suficiente dinero.</p>
                        <p>c. Vender Propiedades:</p>
                        <p className="instruction-description">- Los jugadores pueden vender propiedades únicamente al banco.</p>
                        <p>d. Pagar Renta:</p>
                        <p className="instruction-description">- Si un jugador visita una propiedad de otro, debe pagar una renta al dueño.</p>
                        <p>e. Suerte:</p>
                        <p className="instruction-description">- Tarjetas de “Suerte” influirán en el juego de manera aleatoria.</p>
                        <p>f. Cárcel:</p>
                        <p className="instruction-description">- Los jugadores pueden ir a la cárcel o salir de ella bajo ciertas condiciones.</p>
                        <p>g. Impuestos:</p>
                        <p className="instruction-description">- Los jugadores deben pagar $150 al visitar esta casilla.</p>
                        <p>h. Turnos:</p>
                        <p className="instruction-description">- En cada turno, cada jugador lanza un dado.</p>
                    </div>
                </div>
                <div className="section">
                    <h3 className="subtitle">3. Visualización de Información</h3>
                    <div className="subrules-container">
                        <p>a.</p>
                            <p className="visual-description"> Los jugadores no pueden ver la cantidad de dinero de los demás.</p>
                        <p>b.</p>
                            <p className="visual-description"> Solo pueden ver las propiedades y servicios a través del tablero.</p>
                        <p>c </p>
                            <p className="visual-description"> Las cartas de suerte no son visibles hasta su uso.</p>
                    </div>
                </div>
                <div className="section">
                    <h3 className="subtitle">4. Término de Partida</h3>
                    <div className="subrules-container">
                        <p>a. Quiebra:</p>
                        <p className="instruction-description">- Si un jugador no puede pagar sus deudas, se declara en bancarrota y sale del juego.</p>
                        <p>b. Fin de Juego:</p>
                        <p className="instruction-description">- Al cumplirse la cantidad de turnos, se compara el dinero y patrimonio de los jugadores para determinar al ganador.</p>
                        <p>c. Desconexión:</p>
                        <p className="instruction-description">- Si un jugador se desconecta, se declara en bancarrota, a menos que solo queden dos jugadores, en cuyo caso el otro gana.</p>
                    </div>
                </div>
                <div className="button-container">
                    <button className="button-back" onClick={goBack}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default Instructions;
