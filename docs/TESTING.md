# Tests and deployment

## Local automated checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build:vercel
npm.cmd test
```

HTTP tests expect the existing preview at `http://127.0.0.1:3001`. Set `TEST_ORIGIN` for a different server. The preview-specific tests expect the actual eight owner-supplied quote-only pieces and an unconfigured backend; use a dedicated test configuration for hosted integration tests.

`database.test.mjs` applies the real migration to a disposable PGlite PostgreSQL engine with minimal test Auth/Storage schemas. It exercises relational constraints, RLS, RPC permissions, option fees, stock holds, rollback, idempotent captured payments, late-payment review, fulfilment, refunds, coupon usage, competing requests, rate limits and dashboard aggregates. PGlite serialises requests through its embedded connection: this does not prove hosted concurrent-transaction behavior.

`commerce.test.mjs` tests HMAC validation, input/option validation, integer totals, CSV formula protection and HTML escaping. `image-policy.test.mjs` tests approved original-image provenance. `http.test.mjs` checks navigation, every original product/image, denied admin access, disabled checkout, real 404s and cross-origin rejection.

The test fixtures use obvious `TEST` identifiers and `.test` emails. They are never imported by production source or seed data. No test calls the actual Razorpay or email provider.

## Standard Vercel path

The app uses Next.js App Router and TypeScript. `vercel.json` selects `npm run build:vercel`, and Next writes to `.next-vercel`. The original Vinext/Sites tooling is retained for the existing local preview, not used by Vercel.

Import this exact project directory into the authorised Vercel account, configure the environment variables and eligible cron schedule, build a private staging deployment, set Auth redirect URLs/webhook URLs to that origin, then complete `LAUNCH.md`. Do not deploy the parent DoctorOS project. Vercel account access was not supplied, so no Vercel deployment has been created.

For a local check of the production output, run `npm.cmd run start:vercel` and open `http://localhost:3002`. Use matching `PUBLIC_SITE_URL` values when testing state-changing requests. Local homepage access does not prove hosted payment or storage operation.
