// src/components/RouletteWheel.tsx
import React, { useState } from 'react';
// Import the image correctly
import rouletteImage from '../assets/roullete.jpg';  // Adjust this path based on your file structure

interface RouletteWheelProps {
    spinning: boolean;
    result?: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, result }) => {
    const [localResult, setLocalResult] = useState<number | undefined>(result);

    const handleSpin = () => {
        setLocalResult(undefined);
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 37);
            setLocalResult(randomNumber);
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative w-[300px] h-[300px]"> {/* Increased size */}
                <img 
                    src={rouletteImage}
                    alt="Roulette Wheel"
                    className={`w-full h-full rounded-full object-cover ${spinning ? 'animate-spin' : ''}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/50 px-4 py-2 rounded text-white text-3xl font-bold">
                        {spinning ? (
                            "Spinning..."
                        ) : localResult !== undefined ? (
                            localResult
                        ) : (
                            "Click to Spin"
                        )}
                    </span>
                </div>
            </div>
            <button
                onClick={handleSpin}
                disabled={spinning}
                className={`px-6 py-2 rounded-md text-white font-semibold ${
                    spinning 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {spinning ? 'Spinning...' : 'Spin Wheel'}
            </button>
            {localResult !== undefined && (
                <div className="text-xl font-semibold">
                    Result: {localResult}
                </div>
            )}
        </div>
    );
};

export default RouletteWheel;