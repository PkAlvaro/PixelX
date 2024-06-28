import "/src/assets/styles/game/card.css";
import React, { useState } from 'react';

function Card({ imgSrc, index}) {
    const [ showImage, setShowImage ] = useState(true);
    const toggleImage = () => {
        setShowImage(!showImage);
    }
    return (
        <div className={ ' card card- ${index + 1}'}>
            <div className="card-container">
                {showImage && <img src={imgSrc} className="logo" alt="Card" />}
            </div>
        </div>
    )
}

export default Card;