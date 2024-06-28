import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../context/GameContext.jsx';
import "/src/assets/styles/Aboutus/aboutus.css";

function AboutUs() {
    const navigate = useNavigate();
    const { isInGame, gameId } = useContext(GameContext);

    useEffect(() => {
    }, [isInGame, gameId]);

    const handleBack = () => {
        if (isInGame && gameId) {
            navigate(`/game/${gameId}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="about-page">
            <div className="about-container">
                <h2 className="about-title">¿Quiénes Somos?</h2>
                <div className="section">
                    <h3 className="subtitle">Nuestro Proyecto</h3>
                    <p className="description">
                        PixelX es un juego inspirado en el clásico juego de mesa "Monopoly", el cual
                        es ambientado en lugares emblemáticos de Chile. Nuestro objetivo es
                        ofrecer una experiencia de juego simple, entretenida y educativa.
                    </p>
                </div>
                <div className="section">
                    <h3 className="subtitle">Nuestro Equipo</h3>
                    <p className="description">
                        Somos tres estudiantes de Ingeniería Civil Industrial de la Pontificia Universidad Católica de Chile.
                        Dos miembros con especialización en Investigación Operativa y mención en TI, y el otro miembro con 
                        especialización en Software y mención Industrial.
                    </p>
                </div>
                <div className="section">
                    <h3 className="subtitle">Nuestro Equipo</h3>
                    <ul className="team">
                        <li>Fátima Valenzuela</li>
                        <li>Nicolás Medel</li>
                        <li>Álvaro Navarrete</li>
                    </ul>
                </div>
                <div className='button-container'>
                    <button className='back-button' onClick={handleBack}>
                    {isInGame && gameId ? 'Volver a la partida' : 'Volver al menú'}
                    </button>
                </div>
            </div>
        </div>
    );                            
}

export default AboutUs;
