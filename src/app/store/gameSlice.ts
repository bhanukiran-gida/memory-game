// store/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
    id: number;
    score: number;
}

interface GameState {
    theme: 'numbers' | 'icons';
    players: Player[];
    gridSize: 4 | 6;
    currentPlayer: number;
    grid: Array<{ value: number | string, revealed: boolean, matched: boolean }>;
    matchedCount: number;
    gameStarted: boolean;
}

const initialState: GameState = {
    theme: 'numbers',
    players: [{ id: 1, score: 0 }, { id: 2, score: 0 }],
    gridSize: 4,
    currentPlayer: 0,
    grid: Array(16).fill({ value: 0, revealed: false, matched: false }),
    matchedCount: 0,
    gameStarted: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<'numbers' | 'icons'>) {
            state.theme = action.payload;
        },
        setPlayers(state, action: PayloadAction<number>) {
            state.players = Array.from({ length: action.payload }, (_, i) => ({ id: i + 1, score: 0 }));
        },
        setGridSize(state, action: PayloadAction<4 | 6>) {
            state.gridSize = action.payload;
            state.grid = Array(action.payload ** 2).fill({ value: 0, revealed: false, matched: false });
        },
        revealTile(state, action: PayloadAction<number>) {
            state.grid[action.payload].revealed = true;
        },
        hideTiles(state) {
            state.grid.forEach(tile => {
                if (!tile.matched) tile.revealed = false;
            });
        },
        matchTiles(state, action: PayloadAction<number[]>) {
            action.payload.forEach(index => {
                state.grid[index].matched = true;
            });
        },
        incrementScore(state) {
            state.players[state.currentPlayer].score += 1;
        },
        nextPlayer(state) {
            state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
        },
        setGrid(state, action: PayloadAction<Array<{ value: number | string, revealed: boolean, matched: boolean }>>) {
            state.grid = action.payload;
        },
        incrementMatchedCount(state) {
            state.matchedCount += 1;
        },
        resetGame(state) {
            state.matchedCount = 0;
            state.players.forEach(player => player.score = 0);
            state.currentPlayer = 0;
            state.grid = Array(state.gridSize ** 2).fill({ value: 0, revealed: false, matched: false });
            state.gameStarted = false;
        },
        startGame(state) {
            state.gameStarted = true;
        }
    }
});

export const { setTheme, setPlayers, setGridSize, revealTile, hideTiles, matchTiles, incrementScore, nextPlayer, setGrid, incrementMatchedCount, resetGame, startGame } = gameSlice.actions;
export default gameSlice.reducer;
