"use client";

import React, { useEffect, useState } from "react";
import useGameStore from "../../app/store/useGameStore";
import { useRouter } from "next/navigation";
import "./style.css";

const GameBoard = () => {
    const {
        grid, currentPlayer, players, matchedCount, gridSize,
        revealTile, hideTiles, incrementScore, nextPlayer, matchTiles, incrementMatchedCount, resetGame, createGrid, setPlayers
    } = useGameStore();
    const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (selectedTiles.length === 2) {
            const [first, second] = selectedTiles;
            if (grid[first].value === grid[second].value) {
                matchTiles([first, second]);
                incrementScore();
                incrementMatchedCount();
            } else {
                setTimeout(() => {
                    hideTiles();
                }, 1000);
            }
            setTimeout(() => {
                nextPlayer();
                setSelectedTiles([]);
            }, 1000);
        }
    }, [selectedTiles]);

    useEffect(() => {
        if (matchedCount === grid.length / 2 && !gameOver) {
            alert(`Game Over! Player ${players[currentPlayer].id} wins!`);
            setGameOver(true);
        }
    }, [matchedCount, gameOver, players, currentPlayer, grid.length]);

    const handleTileClick = (index: number) => {
        if (selectedTiles.length < 2 && !grid[index].revealed) {
            revealTile(index);
            setSelectedTiles([...selectedTiles, index]);
        }
    };

    const handleRestart = () => {
        if (window.confirm("Are you sure you want to restart the game?")) {
            resetGame();
            createGrid();
            setPlayers(players.length);
            setGameOver(false);
        }
        router.push('/game');
    };

    const handleNewGame = () => {
        resetGame();
        createGrid();
        router.push('/settings');
    };

    return (
        <div className="game_board">
            <header className="game_board_header">
                <div className="game_board_header_left">
                    <h3>memory</h3>
                </div>
                <div className="game_board_header_right">
                    <button onClick={handleRestart} className="game_board_header_left_restart">Restart</button>
                    <button onClick={handleNewGame} className="game_board_header_left_new">New Game</button>
                </div>
            </header>
            <div className="game_board_body">
                <div className={`game_board_tiles game_board_tiles_${gridSize}`}>
                    {grid.map((tile, index) => (
                        <div
                            key={index}
                            className={`tile ${tile.revealed ? (tile.matched ? "matched" : "revealed") : ""}`}
                            onClick={() => handleTileClick(index)}
                        >
                            <div className="tile-inner">
                                {tile.revealed || tile.matched ? tile.value : ""}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="scoreboard">
                {players.map((player, index) => (
                    <div key={player.id} className={`scoreboard_player ${currentPlayer === index ? 'current' : ''}`}>
                        <div>Player {player.id}</div>
                        <div className="scoreboard_score">{player.score}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
