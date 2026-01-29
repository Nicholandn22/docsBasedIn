---
sidebar_position: 1
slug: /
---

# BasedLink Documentation

Official documentation for **BasedLink** - The Viral Onchain Content Engine powered by Verifiable AI.

[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-green.svg)](https://docusaurus.io/)
[![Base Network](https://img.shields.io/badge/Network-Base%20Sepolia-blue.svg)](https://base.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## About BasedLink

BasedLink is a gamified, AI-powered content creation platform that brings Verifiable AI to everyday users. Built for the Base Indonesia Hackathon 2025, BasedLink solves the "blank page problem" for creators while demonstrating the power of Base L2 and OnchainKit for seamless, invisible onboarding.

The platform combines generative AI with blockchain-based payment verification to create a next-generation content creation experience for LinkedIn and social media.

## The Problem

1. **Creation Block**: Creators struggle to consistently write viral, engaging content
2. **UX Friction**: Most Web3 dApps feel like "finance tools" - rigid, complex, and intimidating
3. **AI Trust**: Users never know if the AI model is authentic or manipulated

## The Solution

BasedLink combines the best of Generative AI and Onchain Verification:

- **Gamified AI Wizard**: A card-based, intuitive interface to build your post (Topic, Hook, Body, CTA)
- **Verifiable Inference**: Powered by Eigen AI (TEE), proving that a specific model generated specific content
- **Invisible Web3**: Login with Smart Wallet using Passkeys - no seed phrases, no gas friction
- **X402 Payment Protocol**: Blockchain-based payment verification with three pricing tiers

## System Components

BasedLink consists of three main components:

### Frontend Application

Next.js 14 application featuring:
- OnchainKit integration for seamless Web3 UX
- Coinbase Smart Wallet with Passkey authentication
- Gamified deck-building UI for content creation
- EIP-712 signature generation for payments
- Built on Base Sepolia testnet

### AI Backend Service

Next.js API service providing:
- Groq AI integration with llama-3.3-70b and llama-3.1-8b models
- Tavily real-time research to prevent AI hallucinations
- X402 payment verification
- Verifiable AI through EigenLayer TEE
- Public API endpoint for content generation

### Smart Contracts

Solidity smart contracts built with Foundry:
- X402 Payment Processor for payment execution
- MockUSDC token for testnet payments
- Three-tier pricing model (Basic, Pro, Premium)
- EIP-712 signature verification
- Deployed on Base Sepolia

## Key Features

### Smart Wallet Onboarding

Zero-friction login using Coinbase Smart Wallet:
- No browser extensions required
- Passkey authentication with FaceID or TouchID
- Gasless transaction support with Paymaster integration

### Gamified Content Creation

Transform content creation into an engaging experience:
- Card-based interface for selecting AI-generated suggestions
- Swipe and select mechanics for hooks, bodies, and CTAs
- Assemble your perfect post effortlessly

### Verifiable AI

Every piece of content is cryptographically signed:
- Frontend wallet signs a "Grant" message
- Backend verification within Trusted Execution Environment (TEE)
- Cryptographic proof that the AI model was run securely
- Powered by EigenLayer technology

### X402 Payment Protocol

Blockchain-based payment verification:
- Three pricing tiers: Basic ($5), Pro ($15), Premium ($30)
- EIP-712 typed signatures for secure payment authorization
- Backend facilitator pattern for seamless UX
- Smart contract execution with USDC payments

## Technology Stack

### Frontend
- Framework: Next.js 14 (App Router)
- Onchain UX: OnchainKit
- Wallet: Coinbase Smart Wallet
- Network: Base Sepolia L2
- Styling: Tailwind CSS v4 with Framer Motion
- State: Wagmi and Viem

### Backend
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- AI Inference: Groq SDK (llama models)
- Web Research: Tavily API
- Deployment: Cloudflare Tunnel

### Smart Contracts
- Language: Solidity
- Framework: Foundry
- Network: Base Sepolia
- Token: MockUSDC (ERC20)

## Documentation Structure

This documentation provides comprehensive guides and references:

- **Architecture**: System design, component interaction, and payment flows
- **Smart Contracts**: Contract documentation, API reference, and deployment guides
- **API Reference**: Backend endpoints, request/response formats, and examples
- **Frontend**: Smart Wallet integration, payment flows, and UI implementation
- **Guides**: Quick start, integration tutorials, and deployment instructions

## Repository Links

- **Frontend**: [github.com/Auto-Linkid/Frontend](https://github.com/Auto-Linkid/Frontend)
- **AI Backend**: [github.com/Auto-Linkid/AI-Backend](https://github.com/Auto-Linkid/AI-Backend)
- **Smart Contracts**: [github.com/Auto-Linkid/SmartContract](https://github.com/Auto-Linkid/SmartContract)

## Getting Started

To get started with BasedLink, visit the [Quick Start Guide](./guides/quick-start.md) for setup instructions for each component.

For developers looking to integrate BasedLink's features:
- **Backend Developers**: See [Backend Integration Guide](./guides/backend-integration.md)
- **Frontend Developers**: See [Frontend Integration Guide](./guides/frontend-integration.md)
- **Smart Contract Developers**: See [Smart Contract Deployment](./guides/smart-contract-deployment.md)
