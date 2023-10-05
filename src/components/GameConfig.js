import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GameConfig({ onStartGame }) {
    const [difficulty, setDifficulty] = useState('easy');
    const [timeLimit, setTimeLimit] = useState(150);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onStartGame({ difficulty, timeLimit });
        navigate('/game', { state: { timeLimit } });
    };

    return (
        <div className='app-game'>
            <div className="container text-center mt-5">
                <h2 className="mb-4">Memory Game Configuration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty Level:</label>
                        <select className="form-control form-control-sm" id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="timeLimit">Time Limit (seconds):</label>
                        <input className="form-control form-control-sm" type="number" id="timeLimit" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">
                        Start Game
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GameConfig;
