# Decentralized Roulette Game

A blockchain-based roulette game built on the Oasis Sapphire Network where players can bet on numbers, colors, or even/odd outcomes.

## Smart Contracts

The game consists of two main contracts:
- `MoneyPool.sol`: Handles the betting pool and player contributions
- `RouletteGame.sol`: Implements the roulette game logic and random number generation

### Contract Addresses (Sapphire Testnet)
- MoneyPool: `0x150eA9e7BEcD5291B8bD27D935E08A25f41bD4d9`
- RouletteGame: `0x9FB342f34962898D20EB6bCa1C5f3fbaD2Bb1840`

## Game Features

- Create new game sessions with customizable duration
- Place bets on:
  - Numbers (0-36)
  - Colors (Red/Black)
  - Parity (Even/Odd)
- Automatic random number generation using Sapphire's secure RNG
- Winner selection and prize distribution
- 2% platform fee on winnings

## How to Play

1. Connect your wallet (MetaMask)
2. Create a new game or join an existing one
3. Place your bet:
   - Choose betting type (Number/Color/Parity)
   - Select your choice
   - Enter bet amount
4. Wait for game completion
5. Winners receive payouts automatically

## Testing Guide

### Prerequisites
- MetaMask wallet
- Testnet ROSE tokens
- Browser with Web3 support

### Setting Up a Game

1. Connect to Sapphire Testnet
2. Create a new game:
3. Place the bet in the moneyPool
4. Spin the wheel
