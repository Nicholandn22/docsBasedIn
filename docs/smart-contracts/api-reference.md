---
sidebar_position: 2
title: API Reference
---

# Smart Contract API Reference

Complete function reference for the X402PaymentProcessor and MockUSDC contracts.

## X402PaymentProcessor

### Payment Execution Functions

#### executePayment

Execute a payment using a user's EIP-712 signature.

```solidity
function executePayment(
    address user,
    uint256 tier,
    string calldata contentId,
    uint256 nonce,
    uint256 deadline,
    bytes calldata signature
) external nonReentrant
```

**Parameters:**
- `user`: Address of the user authorizing payment
- `tier`: Pricing tier (1=Basic, 2=Pro, 3=Premium)
- `contentId`: Unique identifier for this content (max 64 chars)
- `nonce`: Current nonce for the user (must match on-chain nonce)
- `deadline`: Unix timestamp when signature expires
- `signature`: EIP-712 signature from user

**Requirements:**
- Signature must be valid and from `user` address
- `block.timestamp` must be ≤ `deadline`
- `nonce` must match current user nonce
- `contentId` must not have been used before
-`tier` must be valid (1, 2, or 3)
- User must have approved sufficient USDC

**Effects:**
- Transfers USDC from user to contract
- Increments user nonce
- Marks contentId as used
- Emits `PaymentExecuted` event

**Emits:**
```solidity
emit PaymentExecuted(user, tier, contentId, price);
```

---

#### executeSessionPayment

Execute a payment from user's session balance (facilitator only).

```solidity
function executeSessionPayment(
    address user,
    uint256 tier,
    string calldata contentId
) external onlyFacilitator nonReentrant
```

**Parameters:**
- `user`: Address of the user
- `tier`: Pricing tier (1, 2, or 3)
- `contentId`: Unique identifier for this content

**Requirements:**
- Caller must be the facilitator
- User must have sufficient session balance
- `contentId` must not have been used before
- `tier` must be valid

**Effects:**
- Deducts price from user's session balance
- Marks contentId as used
- Emits `SessionPaymentExecuted` event

**Emits:**
```solidity
emit SessionPaymentExecuted(user, tier, contentId, price);
```

---

### Verification Functions

#### verifyPaymentSignature

Verify a payment signature without executing the payment (view function).

```solidity
function verifyPaymentSignature(
    address user,
    uint256 tier,
    string calldata contentId,
    uint256 nonce,
    uint256 deadline,
    bytes calldata signature
) external view returns (bool valid, string memory reason)
```

**Parameters:**
- Same as `executePayment`

**Returns:**
- `valid`: `true` if signature is valid, `false` otherwise
- `reason`: Error message if invalid, empty string if valid

**Possible Reasons:**
- `"Signature expired"` - deadline has passed
- `"Invalid nonce"` - nonce doesn't match current nonce
- `"Invalid signature"` - signature verification failed
- `"Invalid tier"` - tier is not 1, 2, or 3
- `"ContentId already used"` - contentId has been used before
- `""` - signature is valid

---

### Session Balance Functions

#### deposit

Deposit USDC for session-based payments.

```solidity
function deposit(uint256 amount) external nonReentrant
```

**Parameters:**
- `amount`: Amount of USDC to deposit (in USDC's smallest unit, 6 decimals)

**Requirements:**
- User must have approved contract for `amount` of USDC
- `amount` must be > 0

**Effects:**
- Transfers USDC from user to contract
- Increases user's session balance
- Emits `SessionDeposit` event

**Example:**
```typescript
// Deposit 50 USDC
const amount = ethers.parseUnits('50', 6); // 50000000
await contract.deposit(amount);
```

**Emits:**
```solidity
emit SessionDeposit(msg.sender, amount);
```

---

#### withdraw

Withdraw USDC from session balance.

```solidity
function withdraw(uint256 amount) external nonReentrant
```

**Parameters:**
- `amount`: Amount of USDC to withdraw

**Requirements:**
- User must have sufficient session balance
- `amount` must be > 0

**Effects:**
- Decreases user's session balance
- Transfers USDC from contract to user
- Emits `SessionWithdrawal` event

**Emits:**
```solidity
emit SessionWithdrawal(msg.sender, amount);
```

---

### View Functions

#### getUserNonce

Get the current nonce for a user.

```solidity
function getUserNonce(address user) external view returns (uint256)
```

**Parameters:**
- `user`: Address of the user

**Returns:**
- Current nonce for the user (starts at 0)

**Usage:**
```typescript
const nonce = await contract.getUserNonce(userAddress);
// Use this nonce when creating EIP-712 signature
```

---

#### getTierPrice

Get the price for a specific tier.

```solidity
function getTierPrice(uint256 tier) external view returns (uint256)
```

**Parameters:**
- `tier`: Tier number (1, 2, or 3)

**Returns:**
- Price in USDC (with 6 decimals)
- Returns 0 if tier is invalid

**Example:**
```typescript
const tier1Price = await contract.getTierPrice(1);
// tier1Price = 5000000 (5 USDC)

const tier2Price = await contract.getTierPrice(2);
// tier2Price = 15000000 (15 USDC)
```

---

#### getPaymentRequirements

Get all payment requirements for a tier.

```solidity
function getPaymentRequirements(uint256 tier) external view returns (
    uint256 price,
    address tokenAddress,
    string memory tokenSymbol
)
```

**Parameters:**
- `tier`: Tier number (1, 2, or 3)

**Returns:**
- `price`: Price for this tier (in USDC's smallest unit)
- `tokenAddress`: Address of the USDC token contract
- `tokenSymbol`: Symbol of the token ("USDC")

---

#### isContentIdUsed

Check if a contentId has been used.

```solidity
function isContentIdUsed(string calldata contentId) external view returns (bool)
```

**Parameters:**
- `contentId`: Content identifier to check

**Returns:**
- `true` if contentId has been used, `false` otherwise

**Usage:**
```typescript
const used = await contract.isContentIdUsed('linkedin-123');
if (used) {
  // Generate a new contentId
}
```

---

#### sessionBalance

Get the session balance for a user.

```solidity
function sessionBalance(address user) external view returns (uint256)
```

**Parameters:**
- `user`: Address of the user

**Returns:**
- Session balance in USDC (with 6 decimals)

**Alternative Access:**
```solidity
// Also available as a public mapping
mapping(address => uint256) public sessionBalances;
```

---

### Admin Functions

#### setFacilitator

Set the backend facilitator address (owner only).

```solidity
function setFacilitator(address _facilitator) external onlyOwner
```

**Parameters:**
- `_facilitator`: Address of the new facilitator

**Requirements:**
- Caller must be contract owner
- `_facilitator` must not be zero address

---

#### updateTierPrice

Update the price for a specific tier (owner only).

```solidity
function updateTierPrice(uint256 tier, uint256 newPrice) external onlyOwner
```

**Parameters:**
- `tier`: Tier number to update (1, 2, or 3)
- `newPrice`: New price in USDC (with 6 decimals)

**Requirements:**
- Caller must be contract owner
- `tier` must be valid (1, 2, or 3)
- `newPrice` must be > 0

---

#### withdrawFees

Withdraw accumulated fees from the contract (owner only).

```solidity
function withdrawFees(uint256 amount) external onlyOwner
```

**Parameters:**
- `amount`: Amount of USDC to withdraw

**Requirements:**
- Caller must be contract owner
- Contract must have sufficient balance (excluding session balances)

---

## MockUSDC

Standard ERC20 token contract with additional faucet functionality for testing.

### ERC20 Standard Functions

#### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

Get the USDC balance of an account.

---

#### transfer

```solidity
function transfer(address to, uint256 amount) external returns (bool)
```

Transfer USDC to another address.

---

#### approve

```solidity
function approve(address spender, uint256 amount) external returns (bool)
```

Approve a spender to use your USDC.

**Common Usage:**
```typescript
// Approve X402 contract to spend unlimited USDC
const maxApproval = ethers.MaxUint256;
await mockUSDC.approve(X402_ADDRESS, maxApproval);
```

---

#### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

Check how much a spender is approved to spend.

**Usage:**
```typescript
const allowance = await mockUSDC.allowance(userAddress, X402_ADDRESS);
const price = await x402.getTierPrice(1);

if (allowance < price) {
  // Need approval
  await mockUSDC.approve(X402_ADDRESS, ethers.MaxUint256);
}
```

---

#### transferFrom

```solidity
function transferFrom(
    address from,
    address to,
    uint256 amount
) external returns (bool)
```

Transfer USDC from one address to another (requires approval).

Used internally by X402PaymentProcessor during payment execution.

---

### Faucet Functions

#### faucet

Mint free USDC for testing (testnet only).

```solidity
function faucet() external
```

**Effects:**
- Mints 100 USDC to the caller
- Can be called once per address per day (cooldown)

**Usage:**
```typescript
// Get free test USDC
await mockUSDC.faucet();
// Receive 100 USDC (100000000 in smallest unit)
```

---

#### faucetTo

Mint USDC to a specific address (admin only).

```solidity
function faucetTo(address to, uint256 amount) external onlyOwner
```

**Parameters:**
- `to`: Address to receive USDC
- `amount`: Amount to mint

---

## Contract Addresses

Reference the current deployment addresses:

```typescript
// Base Sepolia Testnet
export const CONTRACTS = {
  X402PaymentProcessor: '0x...', // Update with actual address
  MockUSDC: '0x...', // Update with actual address
} as const;

export const CHAIN_ID = 84532; // Base Sepolia
```

## ABI Files

ABI files are available in the SmartContract repository:

```bash
SmartContract/out/X402PaymentProcessor.sol/X402PaymentProcessor.json
SmartContract/out/MockUSDC.sol/MockUSDC.json
```

**Loading ABIs in TypeScript:**

```typescript
import X402ABI from './abi/X402PaymentProcessor.json';
import MockUSDF_ABI from './abi/MockUSDC.json';

const contract = new ethers.Contract(
  CONTRACTS.X402PaymentProcessor,
  X402ABI,
  signer
);
```

## Common Integration Patterns

### Check Allowance and Approve

```typescript
async function ensureAllowance(
  userAddress: string,
  spender: string,
  amount: bigint
) {
  const currentAllowance = await mockUSDC.allowance(userAddress, spender);
  
  if (currentAllowance < amount) {
    // Request unlimited approval for better UX
    const tx = await mockUSDC.approve(spender, ethers.MaxUint256);
    await tx.wait();
  }
}
```

### Execute Payment Flow

```typescript
async function executePaymentFlow(
  tier: number,
  contentId: string
) {
  // 1. Get nonce
  const nonce = await contract.getUserNonce(userAddress);
  
  // 2. Get price
  const price = await contract.getTierPrice(tier);
  
  // 3. Ensure allowance
  await ensureAllowance(userAddress, X402_ADDRESS, price);
  
  // 4. Create signature
  const deadline = Math.floor(Date.now() / 1000) + 3600;
  const signature = await signEIP712Payment({
    user: userAddress,
    tier,
    contentId,
    nonce,
    deadline,
  });
  
  // 5. Submit to backend
  const response = await fetch('/api/payment', {
    method: 'POST',
    body: JSON.stringify({
      user: userAddress,
      tier,
      contentId,
      nonce,
      deadline,
      signature,
    }),
  });
  
  return response.json();
}
```

### Monitor Events

```typescript
// Listen for payment events
contract.on('PaymentExecuted', (user, tier, contentId, price, event) => {
  console.log(`Payment executed: ${user} paid ${price} for tier ${tier}`);
});

// Listen for session deposits
contract.on('SessionDeposit', (user, amount, event) => {
  console.log(`${user} deposited ${amount} for session`);
});
```
