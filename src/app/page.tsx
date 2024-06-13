"use client"

import React, { useEffect, useState } from 'react';
import Settings from './components/Settings/Settings';
import GameBoard from './components/GameBoard/GameBoard';
import useGameStore from './store/useGameStore';

const HomeComponent = () => {
    const { gridSize, theme, gameStarted, createGrid, startGame } = useGameStore();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        createGrid();
    }, [gridSize, theme]);

    const handleStartGame = () => {
        let timer = 3;
        const countdownInterval = setInterval(() => {
            setCountdown(timer);
            timer -= 1;
            if (timer < 0) {
                clearInterval(countdownInterval);
                startGame();
            }
        }, 1000);
    };

    return (
        <div className="main_body">
            {!gameStarted && countdown === 3 ? (
                <Settings onStartGame={handleStartGame} />
            ) : (
                <>
                    {countdown > 0 ? (
                        <div className="countdown">{countdown}</div>
                    ) : (
                        <GameBoard />
                    )}
                </>
            )}
        </div>
    );
};

const Home = () => <HomeComponent />;

export default Home;
