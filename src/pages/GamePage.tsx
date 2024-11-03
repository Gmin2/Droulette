// src/pages/GamePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Layout from '../components/Layout';
import BettingControls from '../components/BettingControls';
import RouletteWheel from '../components/RouletteWheel';
import { GameDetails } from '../types';

const GamePage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const { getGameDetails } = useGameContext();
    const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [spinning, setSpinning] = useState<boolean>(false);
    const [result, setResult] = useState<number | undefined>(undefined);

    useEffect(() => {
        const loadGameDetails = async () => {
            if (!gameId) return;
    
            try {
                console.log("Loading game details for ID:", gameId);
                const details = await getGameDetails(gameId);
                console.log("Loaded game details:", details);
                
                setGameDetails(details);
                
                const remaining = parseInt(details.endTime) - Math.floor(Date.now() / 1000);
                setTimeLeft(remaining > 0 ? remaining : 0);
            } catch (error) {
                console.error("Error loading game details:", error);
            }
        };
    
        loadGameDetails();
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1 && prev > 0) {
                    setSpinning(true);
                    setTimeout(() => {
                        setSpinning(false);
                        const finalResult = Math.floor(Math.random() * 37);
                        setResult(finalResult);
                    }, 3000);
                }
                return prev > 0 ? prev - 1 : 0;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [gameId]);

    if (!gameDetails) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">Game #{gameId}</h2>
                        <p className="text-gray-600">Time Left: {timeLeft} seconds</p>
                        <p className="text-gray-600">
                            Pool Balance: {gameDetails.poolBalance} ETH
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex justify-center">
                            <RouletteWheel spinning={spinning} result={result} />
                        </div>
                        {timeLeft > 0 && (
                            <div>
                                <BettingControls gameId={gameId} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default GamePage;