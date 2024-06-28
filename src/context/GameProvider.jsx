import { useState, useEffect } from "react";
import { GameContext } from "./GameContext.jsx";

const GameProvider = ({ children }) => {
    const [isInGame, setIsInGame] = useState(() => {
        const savedIsInGame = localStorage.getItem('isInGame');
        return savedIsInGame ? JSON.parse(savedIsInGame) : false;
    });
    const [gameId, setGameId] = useState(() => {
        const savedGameId = localStorage.getItem('gameId');
        return savedGameId ? JSON.parse(savedGameId) : null;
    });

    useEffect(() => {
        localStorage.setItem('isInGame', JSON.stringify(isInGame));
    }, [isInGame]);

    useEffect(() => {
        localStorage.setItem('gameId', JSON.stringify(gameId));
    }, [gameId]);

    return (
        <GameContext.Provider value={{ isInGame, setIsInGame, gameId, setGameId }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;

