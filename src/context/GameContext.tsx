import { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS } from '../contracts/config';
import { GameContextType, BetType, GameDetails } from '../types';

const GameContext = createContext<GameContextType>({
    account: '',
    loading: false,
    error: null,
    connect: async () => {},
    createGame: async () => '',
    placeBet: async () => {},
    getGameDetails: async () => ({ endTime: '0', poolBalance: '0' })
});

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
    const [account, setAccount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const connect = async (): Promise<void> => {
        try {
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ 
                    method: "eth_requestAccounts" 
                });
                setAccount(accounts[0]);
            } else {
                throw new Error("Please install MetaMask");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    };

    const createGame = async (duration: number): Promise<string> => {
        try {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACTS.ROULETTE_GAME.address,
                CONTRACTS.ROULETTE_GAME.abi,
                signer
            );
    
            console.log("Creating game with duration:", duration);
    
            const tx = await contract.scheduleMatch(duration, 2); 
            console.log("Transaction submitted:", tx.hash);
    
            // Wait for transaction to be mined
            const receipt = await tx.wait();
            console.log("Transaction receipt:", receipt);
    
            // Find the MatchScheduled event in the transaction receipt
            const event = receipt.events?.find(
                (event: any) => event.event === "MatchScheduled"
            );
    
            if (!event) {
                throw new Error("No MatchScheduled event found");
            }
    
            console.log("Game created with details:", event.args);
    
            // Return the game ID (endTime in this case)
            return event.args.endTime.toString();
        } catch (err) {
            console.error("Error creating game:", err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            return '';
        } finally {
            setLoading(false);
        }
    };

    const placeBet = async (
        gameId: string, 
        betType: BetType, 
        choice: number, 
        amount: string
    ): Promise<void> => {
        try {
            setLoading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACTS.ROULETTE_GAME.address,
                CONTRACTS.ROULETTE_GAME.abi,
                signer
            );
    
            console.log("Placing bet:", {
                gameId,
                betType,
                choice,
                amount
            });
    
            // Convert amount to Wei
            const amountInWei = ethers.utils.parseEther(amount);
    
            // Call appropriate betting function based on type
            let tx;
            switch (betType) {
                case BetType.NUMBER:
                    tx = await contract.betOnNumber(choice, amount, {
                        value: amountInWei
                    });
                    break;
                case BetType.COLOR:
                    tx = await contract.betOnColor(choice, amount, {
                        value: amountInWei
                    });
                    break;
                case BetType.PARITY:
                    tx = await contract.betOnParity(choice, amount, {
                        value: amountInWei
                    });
                    break;
                default:
                    throw new Error("Invalid bet type");
            }
    
            console.log("Bet transaction submitted:", tx.hash);
    
            // Wait for transaction to be mined
            const receipt = await tx.wait();
            console.log("Bet transaction receipt:", receipt);
    
            // Verify the bet was placed by checking for BetPlaced event
            const event = receipt.events?.find(
                (event: any) => event.event === "BetPlaced"
            );
    
            if (!event) {
                throw new Error("Bet placement failed - no BetPlaced event found");
            }
    
        } catch (err) {
            console.error("Error placing bet:", err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            throw err; // Re-throw to handle in component
        } finally {
            setLoading(false);
        }
    };

    const getGameDetails = async (_gameId: string): Promise<GameDetails> => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                CONTRACTS.ROULETTE_GAME.address,
                CONTRACTS.ROULETTE_GAME.abi,
                provider
            );

            const endTime = await contract.matchEndTime();
            const poolBalance = await contract.poolBalance();
            
            return {
                endTime: endTime.toString(),
                poolBalance: ethers.utils.formatEther(poolBalance)
            };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            return { endTime: '0', poolBalance: '0' };
        }
    };

    const contextValue: GameContextType = {
        account,
        connect,
        createGame,
        placeBet,
        getGameDetails,
        loading,
        error
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};