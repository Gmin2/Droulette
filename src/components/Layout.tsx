// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { account, connect } = useGameContext();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex-shrink-0 flex items-center">
                                Roulette Game
                            </Link>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link to="/games" className="px-3 py-2 rounded-md text-sm font-medium">
                                    Games
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {!account ? (
                                <button
                                    onClick={connect}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Connect Wallet
                                </button>
                            ) : (
                                <span className="text-sm text-gray-500">
                                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;