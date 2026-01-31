---
sidebar_position: 1
title: Quick Start
---

# Quick Start Guide

Get started with BasedLink by setting up the Frontend, AI Backend, and Smart Contracts locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (or npm/yarn)
- **Git**: Latest version
- **Foundry**: For smart contract development (optional)
- **MetaMask** or **Coinbase Wallet**: For testing

## Setup Overview

BasedLink consists of three main components:

1. **Frontend** - Next.js application with Smart Wallet integration
2. **AI Backend** - API service with Groq AI and Tavily research
3. **Smart Contracts** - Solidity contracts on Base Sepolia

## Frontend Setup

### Clone the Repository

```bash
git clone https://github.com/Auto-Linkid/Frontend.git
cd Frontend
```

### Install Dependencies

```bash
pnpm install
```

### Configure Environment Variables

Create a `.env.local` file:

```bash
# OnchainKit Configuration
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_coinbase_api_key

# Base Network
NEXT_PUBLIC_CHAIN_ID=84532

# Smart Contract Addresses
NEXT_PUBLIC_X402_ADDRESS=0x...
NEXT_PUBLIC_USDC_ADDRESS=0x...

# Backend API
NEXT_PUBLIC_API_URL=https://proto-hackathon-base.tempegoreng.my.id
```

### Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Connect Your Wallet

1. Open the application in your browser
2. Click "Connect Wallet"
3. Choose Coinbase Smart Wallet or MetaMask
4. Approve the connection
5. Switch to Base Sepolia network if prompted

## AI Backend Setup

### Clone the Repository

```bash
git clone https://github.com/Auto-Linkid/AI-Backend.git
cd AI-Backend
```

### Install Dependencies

```bash
pnpm install
```

### Configure Environment Variables

Create a `.env.local` file:

```bash
# Groq AI API
GROQ_API_KEY=your_groq_api_key

# Tavily Research API
TAVILY_API_KEY=your_tavily_api_key

# Base Sepolia RPC
BASE_RPC_URL=https://sepolia.base.org

# Smart Contract Configuration
X402_CONTRACT_ADDRESS=0x...
USDC_CONTRACT_ADDRESS=0x...

# Facilitator Private Key (for executing payments)
FACILITATOR_PRIVATE_KEY=0x...

# EigenLayer TEE (optional)
EIGEN_NODE_URL=your_eigen_node_url
```

### Get API Keys

**Groq AI**:
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys
4. Create a new API key

**Tavily**:
1. Visit [tavily.com](https://tavily.com)
2. Sign up for an API key
3. Copy your API key

### Start Development Server

```bash
pnpm dev
```

The API will be available at `http://localhost:3000/api/`.

### Test the API

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Testing BasedLink"}'
```

## Smart Contracts Setup

### Clone the Repository

```bash
git clone https://github.com/Auto-Linkid/SmartContract.git
cd SmartContract
```

### Install Foundry

If you haven't installed Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Install Dependencies

```bash
forge install
```

### Compile Contracts

```bash
forge build
```

### Run Tests

```bash
forge test
```

### Deploy to Base Sepolia (Optional)

Create a `.env` file:

```bash
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_private_key_for_deployment
BASESCAN_API_KEY=your_basescan_api_key
```

Deploy contracts:

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

## Getting Test Funds

### Base Sepolia ETH

Get testnet ETH for gas fees:

1. Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet)
2. Connect your wallet
3. Request testnet ETH

### MockUSDC

Get test USDC tokens:

**Method 1: Using the Frontend**
1. Connect your wallet
2. Click "Get Test USDC" button
3. Confirm the transaction

**Method 2: Direct Contract Interaction**
```typescript
import { ethers } from 'ethers';

const mockUSDC = new ethers.Contract(
  USDC_ADDRESS,
  ['function faucet() external'],
  signer
);

await mockUSDC.faucet(); // Mints 100 USDC
```

## Quick Test Flow

### End-to-End Testing

1. **Start All Services**
   ```bash
   # Terminal 1: Frontend
   cd Frontend && pnpm dev

   # Terminal 2: Backend
   cd AI-Backend && pnpm dev
   ```

2. **Connect Wallet**
   - Open `http://localhost:3000`
   - Connect Coinbase Smart Wallet or MetaMask
   - Ensure you're on Base Sepolia

3. **Get Test USDC**
   - Click "Get Test USDC" button
   - Confirm transaction
   - Wait for confirmation

4. **Generate Content**
   - Select a pricing tier (Basic, Pro, or Premium)
   - Enter a topic (e.g., "AI in 2025")
   - Click "Generate"
   - Approve USDC if needed
   - Sign payment request
   - Wait for content generation

5. **View Result**
   - Generated content appears on screen
   - Verification badge shows TEE proof
   - Transaction hash available

## Common Issues

### Wallet Connection Issues

**Problem**: Can't connect to Coinbase Smart Wallet

**Solution**:
- Ensure you're using a supported browser (Chrome, Safari)
- Clear browser cache and cookies
- Try incognito/private mode

---

**Problem**: Wrong network

**Solution**:
- Network should be "Base Sepolia" (Chain ID: 84532)
- Manually add network to wallet if needed:
  - RPC: `https://sepolia.base.org`
  - Chain ID: `84532`
  - Symbol: `ETH`

### Transaction Issues

**Problem**: "Insufficient funds" error

**Solution**:
- Get testnet ETH from Base Sepolia faucet
- Get MockUSDC from faucet function

---

**Problem**: "Invalid signature" error

**Solution**:
- Ensure your nonce is current
- Check that deadline hasn't expired (1 hour default)
- Verify you're signing with the correct wallet

### API Issues

**Problem**: 429 Rate Limit Error

**Solution**:
- Free tier limited to 10 requests/hour
- Use paid endpoint with payment signatures
- Wait for rate limit reset

---

**Problem**: 500 Server Error

**Solution**:
- Check API keys are valid (Groq, Tavily)
- Verify RPC URL is accessible
- Check server logs for detailed error

## Development Tips

### Use Environment Variables

Create `.env.local` files for sensitive data:

```bash
# Never commit .env files to git
echo ".env.local" >> .gitignore
```

### Hot Reload

All three components support hot reload:
- Frontend: Auto-refreshes on file changes
- Backend: API routes reload automatically
- Smart Contracts: Use `forge test --watch`

### Logging

Enable debug logging:

```bash
# Frontend
NEXT_PUBLIC_DEBUG=true pnpm dev

# Backend
DEBUG=* pnpm dev
```

### Testing on Mobile

Test Smart Wallet on mobile:

1. Expose local server:
   ```bash
   # Using ngrok
   ngrok http 3000
   ```

2. Open ngrok URL on mobile browser
3. Connect Coinbase Wallet mobile app

## Next Steps

Once you have everything running:

1. **Explore the UI**: Try different pricing tiers
2. **Read the Documentation**: Learn about architecture and API
3. **Customize**: Modify the frontend to match your brand
4. **Deploy**: Deploy to production on Vercel/Cloudflare
5. **Contribute**: Submit issues or pull requests

## Additional Resources

- [Architecture Overview](../architecture/overview.md)
- [Smart Contracts Documentation](../smart-contracts/overview.md)
- [API Reference](../api/overview.md)
- [Frontend Integration Guide](./frontend-integration.md)
- [Backend Integration Guide](./backend-integration.md)

## Need Help?

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions in GitHub Discussions
- **Discord**: Join the community (link in repositories)
