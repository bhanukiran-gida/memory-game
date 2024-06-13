"use client"

import React from 'react';
import useGameStore from '../store/useGameStore';
import Settings from '../../components/Settings/Settings';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const { resetGame } = useGameStore();
    const router = useRouter();

    const handleStartGame = () => {
        resetGame();
        router.push('/game');
    };

    return <Settings onStartGame={handleStartGame} />;
};

export default SettingsPage;
