import { RouletteGameABI } from './abi/RouletteGame';
import { MoneyPoolABI } from './abi/MoneyPool';

export const CONTRACTS = {
  ROULETTE_GAME: {
    address: "0x0b611F2b6E16CBFA452fd4D4FF4c00bEe7aD2Eae" as `0x${string}`,
    abi: RouletteGameABI,
  },
  MONEY_POOL: {
    address: "00x198feaB3B1e3a7aAEC57aF428001b38503a7C0B0 " as `0x${string}`,
    abi: MoneyPoolABI,
  }
} as const;