// components/BettingControls.tsx
import React, { useState } from 'react';
import { BetType } from '../types';
import { useGameContext } from '../context/GameContext';

interface BettingControlsProps {
    gameId: string;
}

const BettingControls: React.FC<BettingControlsProps> = ({ gameId }) => {
    const { placeBet, loading } = useGameContext();
    const [betAmount, setBetAmount] = useState<string>('0.1');
    const [betChoice, setBetChoice] = useState<number>(0);
    const [selectedBetType, setSelectedBetType] = useState<BetType>(BetType.NUMBER);
    const [error, setError] = useState<string>('');
    const [placing, setPlacing] = useState<boolean>(false);

    const validateBet = () => {
        if (!betAmount || parseFloat(betAmount) <= 0) {
            setError('Please enter a valid bet amount');
            return false;
        }

        switch (selectedBetType) {
            case BetType.NUMBER:
                if (betChoice < 0 || betChoice > 36) {
                    setError('Number must be between 0 and 36');
                    return false;
                }
                break;
            case BetType.COLOR:
                if (betChoice !== 0 && betChoice !== 1) {
                    setError('Color must be 0 (Red) or 1 (Black)');
                    return false;
                }
                break;
            case BetType.PARITY:
                if (betChoice !== 0 && betChoice !== 1) {
                    setError('Parity must be 0 (Even) or 1 (Odd)');
                    return false;
                }
                break;
        }

        return true;
    };

    const handlePlaceBet = async () => {
        try {
            setError('');
            if (!validateBet()) return;

            setPlacing(true);
            await placeBet(gameId, selectedBetType, betChoice, betAmount);
            
            // Clear form after successful bet
            setBetAmount('0.1');
            setBetChoice(0);
            setSelectedBetType(BetType.NUMBER);
        } catch (err) {
            console.error("Error placing bet:", err);
            setError(err instanceof Error ? err.message : 'Failed to place bet');
        } finally {
            setPlacing(false);
        }
    };

    const getBetChoiceOptions = () => {
        switch (selectedBetType) {
            case BetType.COLOR:
                return (
                    <select
                        value={betChoice}
                        onChange={(e) => setBetChoice(Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value={0}>Red</option>
                        <option value={1}>Black</option>
                    </select>
                );
            case BetType.PARITY:
                return (
                    <select
                        value={betChoice}
                        onChange={(e) => setBetChoice(Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value={0}>Even</option>
                        <option value={1}>Odd</option>
                    </select>
                );
            default:
                return (
                    <input
                        type="number"
                        value={betChoice}
                        onChange={(e) => setBetChoice(Number(e.target.value))}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min={0}
                        max={36}
                    />
                );
        }
    };

    return (
        <div className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Bet Type
                </label>
                <select
                    value={selectedBetType}
                    onChange={(e) => {
                        setSelectedBetType(Number(e.target.value));
                        setBetChoice(0); // Reset choice when changing bet type
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    disabled={placing}
                >
                    <option value={BetType.NUMBER}>Number</option>
                    <option value={BetType.COLOR}>Color</option>
                    <option value={BetType.PARITY}>Parity</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Choice
                </label>
                {getBetChoiceOptions()}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Amount (ETH)
                </label>
                <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    step="0.01"
                    min="0.01"
                    disabled={placing}
                />
            </div>

            <button
                onClick={handlePlaceBet}
                disabled={loading || placing}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
                {placing ? 'Placing Bet...' : 'Place Bet'}
            </button>
        </div>
    );
};

export default BettingControls;