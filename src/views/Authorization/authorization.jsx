import React from "react";
import { useNavigate } from 'react-router-dom';
import "/src/assets/styles/instructions/instructions.css";

function Authorization() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/'); 
    };

    return (
        <div className="authorization-page">
            <div className="authorization-container">
                <h1>UNAUTHORIZED</h1>
                <button onClick={goBack}>Volver</button>
            </div>
\        </div>
    )
}

export default Authorization;
