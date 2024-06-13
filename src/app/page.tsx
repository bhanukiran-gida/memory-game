// pages/index.tsx
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import useGameStore from './store/useGameStore';
import './globals.css';

const HomePage = () => {
    const router = useRouter();
    const { resetGame } = useGameStore();

    const handleStartGame = () => {
        resetGame();
        router.push('/settings');
    };

    return (
        <div className="main_body">
            <div className="home_card">
                <h1 className="home_title">Welcome to the Memory Game</h1>
                <button onClick={handleStartGame} className="home_start_button">Start Game</button>
            </div>
        </div>
    );
};

export default HomePage;
