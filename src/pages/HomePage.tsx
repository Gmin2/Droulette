// pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Layout from '../components/Layout';
import rouletteImage from '../assets/roullete.jpg'; // Adjust path based on your image location

const HomePage: React.FC = () => {
    const { account, createGame, loading } = useGameContext();
    const navigate = useNavigate();
    const [duration, setDuration] = useState<number>(120);
    const [creating, setCreating] = useState<boolean>(false);

    const handleCreateGame = async () => {
        try {
            setCreating(true);
            console.log("Starting game creation...");
            
            const gameId = await createGame(duration);
            console.log("Game created with ID:", gameId);

            if (gameId) {
                setTimeout(() => {
                    navigate(`/game/${gameId}`);
                }, 1000);
            } else {
                throw new Error("Failed to create game");
            }
        } catch (error) {
            console.error("Error in handleCreateGame:", error);
            alert("Failed to create game. Please try again.");
        } finally {
            setCreating(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Welcome to Roulette Game
                </h1>
                
                {/* Added Roulette Image */}
                <div className="flex justify-center mb-8">
                    <img 
                        src={rouletteImage}
                        alt="Roulette Wheel"
                        className="w-64 h-64 object-cover rounded-full shadow-lg"
                    />
                </div>

                {account && (
                    <div className="bg-white shadow sm:rounded-lg p-6">
                        <h2 className="text-lg font-medium mb-4">Create New Game</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Game Duration (seconds)
                                </label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    min={60}
                                    disabled={creating}
                                />
                            </div>
                            <button
                                onClick={handleCreateGame}
                                disabled={loading || creating}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                            >
                                {creating ? 'Creating Game...' : 'Create Game'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default HomePage;