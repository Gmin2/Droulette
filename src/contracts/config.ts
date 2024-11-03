import { RouletteGameABI } from './abi/RouletteGame';
import { MoneyPoolABI } from './abi/MoneyPool';

export const CONTRACTS = {
  ROULETTE_GAME: {
    address: "0x9FB342f34962898D20EB6bCa1C5f3fbaD2Bb1840" as `0x${string}`,
    abi: RouletteGameABI,
  },
  MONEY_POOL: {
    address: "0x150eA9e7BEcD5291B8bD27D935E08A25f41bD4d9" as `0x${string}`,
    abi: MoneyPoolABI,
  }
} as const;