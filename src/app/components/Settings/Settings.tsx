import useGameStore from '../../store/useGameStore';
import './style.css';

interface SettingsProps {
  onStartGame: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onStartGame }) => {
  const {
    setTheme,
    setPlayers,
    setGridSize,
    resetGame,
    activeTheme,
    activePlayers,
    activeGridSize,
  } = useGameStore();

  const handleThemeChange = (theme: 'numbers' | 'icons') => {
    setTheme(theme);
  };

  const handlePlayersChange = (players: number) => {
    setPlayers(players);
  };

  const handleGridSizeChange = (size: 4 | 6) => {
    setGridSize(size);
  };

  const startGame = () => {
    resetGame();
    onStartGame();
  };

  return (
    <div className="settings">
      <div className="settings_card">
        <div className="settings_card_themes">
          <h3>Select Theme</h3>
          <div className="settings_card_themes_buttons">
            <button
              onClick={() => handleThemeChange('numbers')}
              className={`settings_theme_numbers ${
                activeTheme === 'numbers' ? 'active' : ''
              }`}
            >
              Numbers
            </button>
            <button
              onClick={() => handleThemeChange('icons')}
              className={`settings_theme_icons ${
                activeTheme === 'icons' ? 'active' : ''
              }`}
            >
              Icons
            </button>
          </div>
        </div>
        <div className="settings_card_players">
          <h3>Number of Players</h3>
          <div className="settings_card_players_nums">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => handlePlayersChange(num)}
                className={`settings_card_players_${num} ${
                  activePlayers === num ? 'active' : ''
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <div className="settings_card_size">
          <h3>Size</h3>
          <div className="settings_card_sizes">
            {[4, 6].map((size) => (
              <button
                key={size}
                onClick={() => handleGridSizeChange(size as 4 | 6)}
                className={`settings_theme_size ${
                  activeGridSize === size ? 'active' : ''
                }`}
              >
                {size} x {size}
              </button>
            ))}
          </div>
        </div>
        <div className="settings_card_start">
          <button onClick={startGame} className="settings_theme_numbers">
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
