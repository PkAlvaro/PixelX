import { useEffect, useState } from 'react';
import axios from 'axios';
import "/src/assets/styles/Ranking/ranking.css";
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/Ranking/ranking.css";

function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [ token, setToken ] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    useEffect(() => {
        fetchRanking();
    }, []);

    const fetchRanking = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/partida/highscore`,{}, 
        { headers: { 'Authorization': `Bearer ${token}` }})
        .then((response) => {
            setRanking(response.data);
        }).catch((error) => {
            console.error("Error al obtener el ranking:", error);
        });
    }

    return (
        <div className="ranking-container">
            <h1 className="ranking-title">Ranking de Partidas</h1>
            <ul className='ranking-box'>
                {ranking.map((item, index) => (
                    <li key={index} className='ranking-message'>
                        <span className="ranking-position">Posición: {index + 1}</span>
                        <span className="ranking-username">Usuario: {item.username}</span>
                        <span className="ranking-highscore">Victorias: {item.highscore}</span>
                    </li>
                ))}
            </ul>
            <div className="button-container">
            <button type="button" className="button-register" onClick={handleBack}>Volver</button>
            </div>
        </div>
    );
}


export default Ranking;
