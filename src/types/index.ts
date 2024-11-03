export enum BetType {
    NUMBER = 0,
    COLOR = 1,
    PARITY = 2
}

export interface GameDetails {
    endTime: string;
    poolBalance: string;
}

export interface GameContextType {
    account: string;
    loading: boolean;
    error: string | null;
    connect: () => Promise<void>;
    createGame: (duration: number) => Promise<string>;
    placeBet: (gameId: string, betType: BetType, choice: number, amount: string) => Promise<void>;
    getGameDetails: (gameId: string) => Promise<GameDetails>;
}