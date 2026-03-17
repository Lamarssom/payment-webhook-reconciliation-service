# Payment Webhook & Reconciliation Service

Production-ready webhook handler for Paystack  
Built with NestJS + TypeScript + TypeORM (PostgreSQL) + @nestjs/schedule.

Handles incoming webhooks with HMAC verification, idempotency protection, atomic event storage, and daily reconciliation jobs.

## Features
- Secure Paystack webhook endpoint with SHA512 HMAC validation
- Idempotency using unique reference + database check
- Full audit logging in payment_events table
- Daily cron reconciliation job (2 AM) for pending events
- Swagger API documentation
- Clean, testable architecture (ready for wallet balance updates)

## Tech Stack
- NestJS + TypeScript
- TypeORM + PostgreSQL
- @nestjs/schedule (cron jobs)
- Swagger
- Crypto (HMAC)

## API Documentation
- Swagger: /api (when running locally)

## Quick Start
```bash
npm install
npm run start:dev

Built as part of my backend portfolio (2026). 