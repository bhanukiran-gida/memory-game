import create from 'zustand';

interface Player {
  id: number;
  score: number;
}

interface Tile {
  value: number | string;
  revealed: boolean;
  matched: boolean;
}

interface State {
  theme: 'numbers' | 'icons';
  players: Player[];
  gridSize: 4 | 6;
  currentPlayer: number;
  grid: Tile[];
  matchedCount: number;
  gameStarted: boolean;
  activeTheme: 'numbers' | 'icons';
  activePlayers: number;
  activeGridSize: 4 | 6;
}

interface Actions {
  setTheme: (theme: 'numbers' | 'icons') => void;
  setPlayers: (numPlayers: number) => void;
  setGridSize: (size: 4 | 6) => void;
  revealTile: (index: number) => void;
  hideTiles: () => void;
  matchTiles: (indices: number[]) => void;
  incrementScore: () => void;
  nextPlayer: () => void;
  setGrid: (grid: Tile[]) => void;
  incrementMatchedCount: () => void;
  resetGame: () => void;
  startGame: () => void;
  createGrid: () => void;
}

const createGrid = (size: number): Tile[] => {
  let values = Array.from({ length: size }, (_, i) => i % (size / 2));
  values = values.sort(() => Math.random() - 0.5);
  return values.map(value => ({ value, revealed: false, matched: false }));
};

const useGameStore = create<State & Actions>((set, get) => ({
  theme: 'numbers',
  players: [{ id: 1, score: 0 }],
  gridSize: 4,
  currentPlayer: 0,
  grid: createGrid(16),
  matchedCount: 0,
  gameStarted: false,
  activeTheme: 'numbers',
  activePlayers: 1,
  activeGridSize: 4,
  setTheme: (theme) => set({ theme, activeTheme: theme }),
  setPlayers: (numPlayers) => set({ players: Array.from({ length: numPlayers }, (_, i) => ({ id: i + 1, score: 0 })), activePlayers: numPlayers }),
  setGridSize: (size) => set({ gridSize: size, grid: createGrid(size ** 2), activeGridSize: size }),
  revealTile: (index) => {
    const grid = get().grid.slice();
    grid[index] = { ...grid[index], revealed: true };
    set({ grid });
  },
  hideTiles: () => {
    const grid = get().grid.map(tile => tile.matched ? tile : { ...tile, revealed: false });
    set({ grid });
  },
  matchTiles: (indices) => {
    const grid = get().grid.slice();
    indices.forEach(index => {
      grid[index] = { ...grid[index], matched: true };
    });
    set({ grid });
  },
  incrementScore: () => {
    const players = get().players.slice();
    players[get().currentPlayer].score += 1;
    set({ players });
  },
  nextPlayer: () => set({ currentPlayer: (get().currentPlayer + 1) % get().players.length }),
  setGrid: (grid) => set({ grid }),
  incrementMatchedCount: () => set({ matchedCount: get().matchedCount + 1 }),
  resetGame: () => set({
    matchedCount: 0,
    players: get().players.map(player => ({ ...player, score: 0 })),
    currentPlayer: 0,
    grid: createGrid(get().gridSize ** 2),
    gameStarted: false,
  }),
  startGame: () => set({ gameStarted: true }),
  createGrid: () => set({ grid: createGrid(get().gridSize ** 2) }),
}));

export default useGameStore;
