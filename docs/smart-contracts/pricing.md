---
sidebar_position: 3
title: Pricing Tiers
---

# Pricing Tiers

The X402PaymentProcessor implements a three-tier pricing model designed to match different quality levels and use cases for AI-generated content.

## Tier Overview

| Tier | Name | Price (USDC) | AI Model | Research Depth | Use Case |
|------|------|--------------|----------|----------------|----------|
| 1 | Basic | Rp. 5.00 | llama-3.1-8b-instant | None | Quick posts, rapid generation |
| 2 | Pro | Rp. 15.00 | llama-3.3-70b-versatile | Standard | Professional content, quality |
| 3 | Premium | Rp. 30.00 | llama-3.3-70b-versatile | Deep | Premium content, research-heavy |

## Tier Details

### Tier 1: Basic

**Price**: 5 USDC (5,000,000 in contract units)

**AI Model**: llama-3.1-8b-instant

**Features:**
- Fast generation (typically under 3 seconds)
- Cost-effective for high-volume use
- Good quality for simple topics
- No web research integration
- Suitable for daily posting needs

**Best For:**
- Quick motivation posts
- Simple industry updates
- Daily engagement posts
- Testing the platform
- Budget-conscious users

**Example Output Quality:**
```text
Topic: "Monday Motivation"

Generated Content:
"Start your week strong.

Monday is a fresh start. Here's how to make it count:

1. Set clear goals for the week
2. Prioritize your most important task
3. Take action immediately

Success is built one Monday at a time.

#MondayMotivation #Productivity"
```

---

### Tier 2: Pro

**Price**: 15 USDC (15,000,000 in contract units)

**AI Model**: llama-3.3-70b-versatile

**Features:**
- High-quality content generation
- Standard Tavily research integration
- Better context understanding
- More sophisticated language
- Improved engagement potential

**Best For:**
- Professional brand building
- Thought leadership content
- Industry insights
- Company announcements
- Regular content creators

**Example Output Quality:**
```text
Topic: "AI Agents in 2025"

Generated Content (with research):
"AI Agents are reshaping how we work.

Recent developments in autonomous AI systems show:

1. Agent-to-agent communication is becoming seamless
2. Task automation is reaching 80%+ efficiency
3. Integration with existing tools is now mainstream

According to Gartner's latest report, 60% of enterprises 
will deploy AI agents by Q3 2025.

The question isn't if you'll use AI agents—it's how soon.

#AI #Automation #FutureOfWork"
```

---

### Tier 3: Premium

**Price**: 30 USDC (30,000,000 in contract units)

**AI Model**: llama-3.3-70b-versatile

**Features:**
- Highest quality content generation
- Deep Tavily research (multiple sources)
- Most sophisticated language and structure
- Data-driven insights
- Maximum engagement optimization
- Comprehensive fact-checking

**Best For:**
- C-level executives
- Industry experts
- Viral content attempts
- Critical announcements
- High-stakes communications
- Research-heavy topics

**Example Output Quality:**
```text
Topic: "Future of Blockchain Scalability"

Generated Content (with deep research):
"Layer 2 solutions are finally delivering on their promise.

The data tells a compelling story:

→ Base L2 processed 3.2M transactions yesterday
→ Average gas fees dropped 97% vs. Ethereum L1
→ Transaction finality improved to under 2 seconds

But here's what most people miss:

The real innovation isn't just speed or cost—it's the 
combination of security AND usability. Base proves you 
don't have to choose.

Vitalik's recent EIP-4844 proposal will reduce L2 costs 
by another 10-100x. We're entering the era of truly 
scalable blockchain applications.

This is the infrastructure moment Web3 has been waiting for.

#Blockchain #Layer2 #Web3 #Base

Sources: L2Beat Analytics, Ethereum Foundation Blog"
```

---

## Pricing Structure

### On-Chain Pricing

Prices are stored in the smart contract with 6 decimal places (matching USDC):

```solidity
mapping(uint256 => uint256) public tierPrices;

// Initialization
tierPrices[1] = 5_000_000;  // 5 USDC
tierPrices[2] = 15_000_000; // 15 USDC
tierPrices[3] = 30_000_000; // 30 USDC
```

### Retrieving Prices

**Solidity:**
```solidity
uint256 price = contract.getTierPrice(tier);
```

**TypeScript:**
```typescript
const price = await contract.getTierPrice(tier);
// price = 5000000n for tier 1
const priceInUSDC = Number(price) / 1e6; // 5.0
```

**Display to Users:**
```typescript
function formatPrice(tierPrice: bigint): string {
  const usdcAmount = Number(tierPrice) / 1e6;
  return `Rp. ${usdcAmount.toFixed(2)}`;
}

// Usage
const tier1Price = await contract.getTierPrice(1);
console.log(formatPrice(tier1Price)); // "Rp. 5.00"
```

## Cost Comparison

### Traditional AI API Costs

For reference, typical API costs for similar generation:

| Service | Model | Cost per Request | Equivalent |
|---------|-------|------------------|------------|
| OpenAI | GPT-4 | ~Rp. 0.30-0.60 | Between Basic & Pro |
| Anthropic | Claude 3 | ~Rp. 0.25-0.50 | Basic tier |
| Groq (Direct) | llama-3.3-70b | ~Rp. 0.05 | Much cheaper |

**BasedLink Value Proposition:**
- Includes blockchain verification
- Guaranteed AI model provenance (TEE)
- Integrated research (Pro/Premium)
- One-click UX with Smart Wallet
- No API key management
- On-chain payment records

### Bulk Pricing via Sessions

For users generating multiple pieces of content, session-based payments offer better economics:

```typescript
// Instead of 10 individual Basic payments (10 × Rp. 5 = Rp. 50)
// Deposit Rp. 50 once and use session balance
await contract.deposit(parseUnits('50', 6));

// Backend deducts from session balance without signatures
// Better UX + potential discounts in future versions
```

## Tier Selection Guide

### When to Use Basic (Tier 1)

**Scenarios:**
- Daily engagement posts
- Quick updates
- Testing content ideas
- High-volume posting (5+ per day)
- Simple topics without research needs
- Budget constraints

**ROI Consideration:**
- Rp. 5 per post
- If post gets 1000+ impressions: ~Rp. 0.005 per impression
- Worthwhile if it saves 15+ minutes of writing time

---

### When to Use Pro (Tier 2)

**Scenarios:**
- Professional thought leadership
- Industry trend discussions
- Company updates requiring context
- 2-3 quality posts per week
- Topics requiring current data
- Building personal brand

**ROI Consideration:**
- Rp. 15 per post
- If post gets 10,000+ impressions: ~Rp. 0.0015 per impression
- Worthwhile for content that drives leads/connections
- Research integration saves 30-60 minutes

---

### When to Use Premium (Tier 3)

**Scenarios:**
- Viral content attempts
- Major announcements
- Industry reports/whitepapers
- C-level communications
- Controversial/nuanced topics
- Research-heavy discussions

**ROI Consideration:**
- Rp. 30 per post
- If post gets 50,000+ impressions: ~Rp. 0.0006 per impression
- Worthwhile for high-stakes communications
- Deep research saves 1-2 hours of work

## Dynamic Pricing (Future)

The smart contract supports dynamic pricing updates:

```solidity
function updateTierPrice(uint256 tier, uint256 newPrice) external onlyOwner
```

**Potential Future Models:**
- Market-based pricing (demand/supply)
- Subscription tiers (monthly unlimited)
- Volume discounts
- Token holder discounts
- Referral credits

## Revenue Distribution

Current fee structure (can be updated):

- **70%** - AI inference costs (Groq API)
- **20%** - Research costs (Tavily API)
- **10%** - Platform fee (development, hosting, verification)

**Transparency:**
All payments are recorded on-chain with full visibility:
```solidity
event PaymentExecuted(
    address indexed user,
    uint256 indexed tier,
    string contentId,
    uint256 price
);
```

## Discounts and Promotions

### Early Adopter Discount

For testnet launch on Base Sepolia:
- All tiers using MockUSDC (free to mint)
- Faucet provides 100 USDC per address
- Unlimited faucet access during beta

### Future Discount Mechanisms

Planned for mainnet:

1. **Volume Discounts**
   ```solidity
   // 10% off after 10 payments in a month
   // 20% off after 25 payments
   // 30% off after 50 payments
   ```

2. **Loyalty Tiers**
   ```solidity
   // NFT holders get 15% discount
   // Early adopters get permanent 10% discount
   ```

3. **Referral Credits**
   ```solidity
   // Refer a user: 1 free Basic tier
   // 5 referrals: 1 month Pro tier
   ```

## Comparing Tiers Side-by-Side

```typescript
const TIER_COMPARISON = {
  basic: {
    price: 5,
    speed: 'Fast (2-3s)',
    model: '8B',
    research: 'None',
    quality: 'Good',
    useCase: 'Daily posts',
  },
  pro: {
    price: 15,
    speed: 'Medium (5-8s)',
    model: '70B',
    research: 'Standard',
    quality: 'Excellent',
    useCase: 'Professional',
  },
  premium: {
    price: 30,
    speed: 'Slower (10-15s)',
    model: '70B',
    research: 'Deep',
    quality: 'Outstanding',
    useCase: 'Viral content',
  },
};
```

## Smart Contract Price Queries

### Get All Tier Prices

```typescript
async function getAllPrices(contract) {
  const [tier1, tier2, tier3] = await Promise.all([
    contract.getTierPrice(1),
    contract.getTierPrice(2),
    contract.getTierPrice(3),
  ]);
  
  return {
    basic: formatPrice(tier1),
    pro: formatPrice(tier2),
    premium: formatPrice(tier3),
  };
}
```

### Get Payment Requirements

```typescript
const requirements = await contract.getPaymentRequirements(tier);
// Returns: { price, tokenAddress, tokenSymbol }

console.log(`Pay ${formatPrice(requirements.price)} ${requirements.tokenSymbol}`);
```

## Testnet vs Mainnet Pricing

### Base Sepolia (Testnet)

- **MockUSDC**: Free to mint via faucet
- **Gas Fees**: Free (testnet ETH from faucet)
- **Purpose**: Testing and development
- **No Real Value**: Educational purposes only

### Base Mainnet (Future)

- **Real USDC**: Actual value required
- **Gas Fees**: Minimal (~Rp. 0.01-0.05 per transaction)
- **Purpose**: Production use
- **Real Payments**: Actual charges apply
