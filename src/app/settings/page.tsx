"use client"

import './style.css'// components/Settings.tsx
import useGameStore from '../store/useGameStore';
import './style.css'

interface SettingsProps {
    onStartGame: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onStartGame }) => {    

    const { setTheme, setPlayers, setGridSize, resetGame } = useGameStore();

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

    return(
        <div className="settings">
            <div className="settings_card">
                <div className='settings_card_themes'>
                    {/* <label htmlFor="settings_theme"> */}
                        <h3>Select Theme</h3>
                        <div className='settings_card_themes_buttons'>
                            <button onClick={() => handleThemeChange('numbers')}className='settings_theme_numbers'>Numbers</button>
                            <button onClick={() => handleThemeChange('icons')}className='settings_theme_icons'>Icons</button>
                        </div>
                        
                    {/* </label> */}

                </div>
                <div className='settings_card_players'>
                <h3>Number of Players</h3>
                <div className='settings_card_players_nums'>

                        <button onClick={() => handlePlayersChange(1)}className='settings_card_players_1'>1</button>
                        <button onClick={() => handlePlayersChange(2)}className='settings_card_players_2'>2</button>
                        <button onClick={() => handlePlayersChange(3)}className='settings_card_players_3'>3</button>
                        <button onClick={() => handlePlayersChange(4)}className='settings_card_players_4'>4</button>
                    </div>

                </div>
                <div className='settings_card_size'>
                <h3>Size</h3>
                    <div className="settings_card_sizes">

                        <button onClick={() => handleGridSizeChange(4)}className='settings_theme_numbers'>4 x 4</button>
                        <button onClick={() => handleGridSizeChange(6)}className='settings_theme_icons'>6 x 6</button>
                    </div>


                </div>
                <div className='settings_card_start'>
                        <button onClick={startGame}className='settings_theme_numbers'>Start Game</button>
                        

                </div>
                

            </div>
            

        </div>

    )
}

export default Settings;
