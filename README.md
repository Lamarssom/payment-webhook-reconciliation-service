# Payment Webhook & Reconciliation Service

Production-ready webhook handler for Paystack & Flutterwave  
Built with NestJS + TypeScript, TypeORM (PostgreSQL), Redis (BullMQ), and full audit logging.

Handles incoming webhooks with idempotency protection, background reconciliation jobs, atomic transaction updates, and daily reports. Perfect for fintech wallets, e-commerce, or subscription platforms.

## Features
- Secure webhook endpoints (Paystack + Flutterwave)
- Idempotency checks using reference + SHA256 hash
- Automatic event storage + processing
- BullMQ background jobs for reconciliation & retries
- Atomic balance updates via PostgreSQL transactions
- Full audit logging
- Swagger API documentation
- Docker + GitHub Actions CI/CD ready
- Unit + integration tests (Jest)

## Tech Stack
- NestJS + TypeScript
- TypeORM + PostgreSQL
- Redis + BullMQ
- Swagger
- Class-validator + Class-transformer
- Crypto-js (idempotency)

## Live Demo
(Will be deployed to Render/Vercel after completion)

## Project Links
- GitHub: https://github.com/Lamarssom/payment-webhook-reconciliation-service
- Postman Collection: (will be added)
- Swagger: /api (when running locally)

## Quick Start
```bash
npm install
cp .env.example .env
# Add your Paystack/Flutterwave secret keys + DB credentials
npm run start:dev

Built as part of my mid-level backend portfolio (2026). 