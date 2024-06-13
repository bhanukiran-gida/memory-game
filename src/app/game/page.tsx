"use client"

import React, { useEffect, useState } from 'react';
import useGameStore from '../store/useGameStore';
import GameBoard from '../../components/GameBoard/GameBoard';
import { useRouter } from 'next/navigation';
import './style.css';

const GamePage = () => {
    const { gameStarted, startTheGame } = useGameStore();
    const [countdown, setCountdown] = useState(3);
    const [showCountdown, setShowCountdown] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let timer = 3;
        const countdownInterval = setInterval(() => {
            setCountdown(timer);
            timer -= 1;
            if (timer < 0) {
                clearInterval(countdownInterval);
                startTheGame();
                setTimeout(() => setShowCountdown(false), 1000);
            }
        }, 500);
    }, []);

    useEffect(() => {
        if (!gameStarted) {
            router.push('/settings');
        }
    }, [gameStarted]);

    return (
        <div className="main_body">
            {showCountdown ? (
                <div className="countdown_circle">
                    <div className='countdown_circle_value'>
                        {countdown > 0 ? countdown : 'GO'}
                    </div>
                    
                </div>
            ) : (
                <GameBoard />
            )}
        </div>
    );
};

export default GamePage;
