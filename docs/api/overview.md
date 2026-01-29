---
sidebar_position: 1
title: Overview
---

# AI Backend API Overview

The BasedLink AI Backend is a Next.js API service that provides AI-powered content generation using Groq AI models with real-time research capabilities via Tavily API.

## Base Endpoint

**Production URL**: `https://proto-hackathon-base.tempegoreng.my.id`

**Environment**: Cloudflare Tunnel for secure, public access

## Key Features

### AI Content Generation

- **Multiple AI Models**: Support for both llama-3.3-70b-versatile (high quality) and llama-3.1-8b-instant (high speed)
- **Research Integration**: Tavily API integration for real-time web research to prevent AI hallucinations
- **Verifiable AI**: EigenLayer TEE integration for cryptographically verifiable inference
- **X402 Payment Verification**: Built-in payment signature verification and on-chain execution

### API Characteristics

- **RESTful**: Standard HTTP POST endpoints
- **JSON**: All requests and responses use JSON format
- **CORS Enabled**: Ready for cross-origin requests from frontend applications
- **Public Access**: No API key required for generation endpoint (payment verification required for paid tiers)
- **Rate Limiting**: Fair use rate limiting to prevent abuse

## Available Endpoints

### Content Generation

**POST** `/api/generate`

Generate AI-powered LinkedIn content without payment (for testing).

**Parameters:**
- `topic` (required): The content topic or subject
- `model` (optional): AI model selection (`llama-3.3-70b-versatile` or `llama-3.1-8b-instant`)

### Payment Processing

**POST** `/api/payment`

Verify payment signature and generate premium content.

**Parameters:**
- `user`: User wallet address
- `tier`: Pricing tier (1, 2, or 3)
- `contentId`: Unique content identifier
- `nonce`: User's current nonce
- `deadline`: Signature expiration timestamp
- `signature`: EIP-712 payment signature

### Utility Endpoints

**GET** `/api/nonce`

Get the current nonce for a user address.

**Query Parameters:**
- `user`: User wallet address

## Technology Stack

### Framework
- **Next.js 14**: App Router for modern API development
- **TypeScript**: Type-safe development

### AI Services
- **Groq AI**: Ultra-fast inference for llama models
  - `llama-3.3-70b-versatile`: High quality, complex reasoning
  - `llama-3.1-8b-instant`: Fast generation, simpler tasks
- **Tavily API**: Real-time web research and data retrieval

### Blockchain Integration
- **ethers.js**: Smart contract interaction
- **EIP-712**: Signature verification
- **Base RPC**: Connection to Base Sepolia network

### Deployment
- **Cloudflare Tunnel**: Secure public access
- **Custom Domain**: Production-ready endpoint

## Request/Response Format

### Standard Request

```json
{
  "topic": "AI Agents in 2025",
  "model": "llama-3.3-70b-versatile"
}
```

### Standard Response

```json
{
  "result": "AI Agents are transforming...\n\nHere's why:\n\n1. Point one\n2. Point two\n\n#AI #Tech"
}
```

### Error Response

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `MISSING_TOPIC` | 400 | Topic parameter is required |
| `INVALID_MODEL` | 400 | Specified model is not supported |
| `INVALID_SIGNATURE` | 402 | Payment signature verification failed |
| `SIGNATURE_EXPIRED` | 402 | Payment signature deadline passed |
| `INVALID_NONCE` | 402 | Nonce doesn't match on-chain value |
| `PAYMENT_FAILED` | 402 | On-chain payment execution failed |
| `AI_ERROR` | 500 | AI generation service error |
| `RESEARCH_ERROR` | 500 | Research API error |
| `NETWORK_ERROR` | 500 | Blockchain network error |

## Rate Limiting

**Current Limits:**
- Free tier (`/api/generate`): 10 requests per hour per IP
- Paid tier (`/api/payment`): Unlimited (limited by payment)

**Response Headers:**
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1640000000
```

## Authentication

### For Generate testing Endpoint

No authentication required. Public access for testing.

### For Payment Endpoint

Payment verification via EIP-712 signatures:
1. User signs payment authorization
2. Backend verifies signature on-chain
3. Backend executes payment
4. Content generation proceeds

## CORS Configuration

CORS is enabled for all origins:

```typescript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

## Service Status

Monitor service status:
- **Health Check**: `/api/health`
- **Version**: `/api/version`

## Next Steps

- [Generate Endpoint](./generate-endpoint.md) - Detailed endpoint documentation
- [Payment Integration](./payment-integration.md) - Payment verification guide
- [Tavily Research](./tavily-research.md) - Research integration details
