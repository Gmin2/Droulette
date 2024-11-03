// src/components/RouletteWheel.tsx
import React, { useState } from 'react';

interface RouletteWheelProps {
    spinning: boolean;
    result?: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, result }) => {
    const [localResult, setLocalResult] = useState<number | undefined>(result);

    const handleSpin = () => {
        // Simulate spinning
        setLocalResult(undefined);
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 37); // 0-36
            setLocalResult(randomNumber);
        }, 2000); // 2 seconds delay to simulate spinning
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="bg-red-600 text-white rounded-full w-48 h-48 flex items-center justify-center text-3xl font-bold">
                {spinning ? (
                    "Spinning..."
                ) : localResult !== undefined ? (
                    localResult
                ) : (
                    "Click to Spin"
                )}
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