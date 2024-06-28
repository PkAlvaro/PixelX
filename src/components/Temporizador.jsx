import React, { useEffect, useState } from 'react';
import "../assets/styles/temporizador/temporizador.css";

const Temporizador = () => {
    const [time, setTime] = useState(10);

    useEffect(() => {
        if (time === 0) { return; }

        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <div >
            <h2 className='temporizador-text'>Tiempo restante: {time}</h2>
        </div>
    );
};

export default Temporizador;