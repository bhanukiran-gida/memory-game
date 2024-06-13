"use client";

import React, { useEffect, useState } from "react";
import useGameStore from "../../store/useGameStore";
import "./style.css";

const GameBoard = () => {
    const {
        grid, currentPlayer, players, matchedCount, gridSize,
        revealTile, hideTiles, incrementScore, nextPlayer, matchTiles, incrementMatchedCount
    } = useGameStore();
    const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
    console.log(players);

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

    const handleTileClick = (index: number) => {
        if (selectedTiles.length < 2 && !grid[index].revealed) {
            revealTile(index);
            setSelectedTiles([...selectedTiles, index]);
        }
    };

    if (matchedCount === grid.length / 2) {
        alert(`Game Over! Player ${players[currentPlayer].id} wins!`);
    }

    return (
        <div className="game_board">
            <header className="game_board_header">
                <div className="game_board_header_left">
                    <h3>memory</h3>
                </div>
                <div className="game_board_header_right">
                    <button className="game_board_header_left_restart">Restart</button>
                    <button className="game_board_header_left_new">New Game</button>
                </div>
            </header>
            <div className="game_board_body">
                <div className="game_board_tiles">
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
