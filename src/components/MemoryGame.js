import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';

import { images } from '../import';

function MemoryGame() {

    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState({});
    const [secondCard, setSecondCard] = useState({});

    const [unflippedCards, setUnflippedCards] = useState([]);
    const [disabledCards, setDisabledCards] = useState([]);
    const location = useLocation();
    const { timeLimit } = location.state || {};
    const [remainingTime, setRemainingTime] = useState(timeLimit);
    const [gameOver, setGameOver] = useState(false);



    useEffect(() => {
        const timer = setInterval(() => {

            setRemainingTime((prevTime) => prevTime - 1);
        }, remainingTime);


        if (remainingTime === 0) {
            setGameOver(true);
            clearInterval(timer);
        }


        return () => clearInterval(timer);
    }, [remainingTime]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    useEffect(() => {
        shuffleArray(images);
        setCards(images);
    }, [])

    useEffect(() => {
        checkForMatch();
    }, [secondCard]);

    const flipCard = (name, number) => {
        if (firstCard.name === name && firstCard.number === number) {
            return 0;
        }
        if (!firstCard.name) {
            setFirstCard({ name, number });
        }
        else if (!secondCard.name) {
            setSecondCard({ name, number });
        }
        return 1;
    }

    const checkForMatch = () => {
        if (firstCard.name && secondCard.name) {
            const match = firstCard.name === secondCard.name;
            match ? disableCards() : unflipCards();
        }
    }

    const disableCards = () => {
        setDisabledCards([firstCard.number, secondCard.number]);
        resetCards();
    };

    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]);
        resetCards();
    };

    const resetCards = () => {
        setFirstCard({});
        setSecondCard({});
    }

    return (
        <div>
            <div className='app'>
                {gameOver ? (
                    <div>
                        <h1>Game Over</h1>
                    </div>
                ) : (
                    <div>
                        <h1>Game in Progress</h1>
                        <p>Time Remaining: {remainingTime} seconds</p>

                        <div className='cards-container'>
                            {
                                cards.map((card, index) => (
                                    <Card
                                        name={card.player}
                                        number={index}
                                        frontFace={card.src}
                                        flipCard={flipCard}
                                        unflippedCards={unflippedCards}
                                        disabledCards={disabledCards}
                                    />
                                ))
                            }
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default MemoryGame;
