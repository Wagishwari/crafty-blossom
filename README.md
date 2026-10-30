# Crafty Blossoms

The existing branded storefront has been extended with a Next.js commerce application. The owner's original logo and eight supplied product photos are retained. Product screenshots were cropped to remove Instagram controls; no product pixels were generated or retouched. See `public/brand/asset-manifest.json` for crop provenance.

**Not yet approved for live trading.** The dedicated Supabase project, merchant/email credentials, confirmed prices and delivery operations are still required. No remote database was modified during this implementation. Local PostgreSQL tests do not prove the hosted environment or live gateway works.

## Local development

Use Node 22.13+ (the implementation was tested with Node 26). Work from this folder, not its parent DoctorOS directory. On Windows use `npm.cmd` to avoid PowerShell execution-policy restrictions.

- Existing local preview: `npm.cmd run dev -- --port 3001 --strictPort` (Vinext/Vite adapter, preserved).
- Standard Next.js development: `npm.cmd run dev:vercel` (port 3002).
- Vercel production build: `npm.cmd run build:vercel`.
- Run that build locally: `npm.cmd run start:vercel` (port 3002).
- Existing Sites/Worker build: `npm.cmd run build`.
- Quality checks: `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test`.

Dependencies are already installed here. For a clean checkout use `npm.cmd ci`. Do not use `npx next dev` from a parent project, and do not disable TLS verification to solve a download error.

## Configuration

Copy `.env.example` to `.env.local` for Next.js or `.dev.vars` for the existing Worker preview. Set `PUBLIC_SITE_URL` to the exact origin used in your browser, including scheme and port. Configure separate production and preview values in Vercel. All keys are server-only. Public clients receive only Razorpay's public key when a checkout is created.

`STORE_MODE=preview` allows the real owner-supplied editorial catalogue without a database. It contains no purchasable variants or invented prices. `STORE_MODE=production` refuses to serve a catalogue if the database is unavailable; it never falls back to sample inventory.

## Database & administrator setup

See [docs/SETUP.md](docs/SETUP.md). The CLI-generated migration is `supabase/migrations/20261027131854_commerce_platform.sql`. Apply this migration to a dedicated development project first. `supabase/seed.sql` contains the eight real owner-supplied catalogue entries with unknown pricing and no manufactured stock. Test fixtures with prices exist only in `tests/database.test.mjs`, in a disposable in-memory PostgreSQL instance.

Customers sign up through `/account` and must verify their email. Provision an administrator by inserting that exact Auth user UUID into `admin_profiles` using a privileged database session. Roles are `admin`, `manager` and `support`. Users cannot assign their own roles. There is no demo password.

## Implemented commerce paths

- Admin-configured categories, subcategories, product variants, regular/sale prices, personalisation options, publishing and image ordering.
- Search autocomplete, shareable collection/price/occasion/recipient/availability filters, sorting, wishlist, related/recently viewed pieces and approved purchase reviews.
- Product image gallery/zoom, configured name/message/photo/gift-wrapping options, quantity, PIN lookup and confirmed delivery options.
- A persistent configuration-aware local bag, database cart sync for signed-in customers, guest checkout and saved customer addresses.
- Server-owned amounts, coupon validation, stock reservations, Razorpay orders, timing-safe payment signatures and raw-body signed webhooks. A browser callback alone never marks an order paid.
- Reservation expiry/reconciliation, transactionally idempotent inventory deduction, late-payment review and no automatic fulfilment of review orders.
- Order history, secure guest order access from the original browser, tracking, printable invoices, reorder, moderated verified-purchase reviews and cancellation/return requests.
- Role-protected studio workspace for products, collections, variants, inventory adjustments/history, fulfilment, delivery zones, coupons, homepage sections, customers, enquiries, reviews, support, refunds, audit records and real sales metrics.
- Durable transactional email outbox and authenticated maintenance endpoint; Razorpay refund requests/reconciliation and explicit one-time restocking after a fully refunded return.
- Original photography, responsive brand styling, reduced-motion support, keyboard focus, page metadata, product structured data, sitemap/robots with indexing disabled before launch.

Prices, promotions, testimonials, shipping promises and product material/size claims are never invented. Bestsellers only have data after verified purchases. Occasion/recipient sections need configured tags. Empty/disabled promotional sections remain hidden.

## Operational boundaries

Read [docs/LAUNCH.md](docs/LAUNCH.md) before enabling sales. Financial workflows require a real sandbox run and hosted PostgreSQL concurrency/RLS verification. No payment or email was actually sent during local automated tests.

- Gateway-order creation timeouts enter `uncertain` and require reconciliation; never blindly create a second provider order. Check the Razorpay receipt equal to the local order UUID.
- One refund request per order is allowed by the app as a conservative duplicate-payment guard. An uncertain refund must be reconciled in Razorpay before manual retry; do not remove its guard blindly.
- Orders paid after a reservation was released enter `payment_review`. The administrator must arrange fulfilment or refund; stock is not silently oversold.
- Failed payment attempts can be retried during the 20-minute reservation. Cancellation or expiry releases reserved stock. The maintenance task must run reliably.
- Express and scheduled delivery appear only for active, owner-configured zones. Estimates include the configured production lead time and zone transit days; they are estimates, not guarantees.
- Private uploads use short-lived signed URLs and cannot be accessed by other shoppers. Retention/cleanup procedures must be configured for your business policy.
- Invoice totals are the original recorded paid amounts. A refund record is separate. Have the business's tax adviser verify invoice requirements before launch.

## Verification

The standard Next.js production build has passed. Automated suites cover the migration in embedded PostgreSQL, server totals/options, reservation rollback, duplicate captured events, amount tampering, late-payment handling, fulfilment restrictions, one-time restocking, RLS isolation, signature validation, export escaping, image provenance and HTTP route/image checks. See [docs/TESTING.md](docs/TESTING.md) for the exact commands and remaining hosted tests.

The requested complete live customer-to-fulfilment journey has not been demonstrated yet because the dedicated backend and merchant accounts are not connected. Browser visual QA also remains a separate launch requirement; do not represent the app as production-ready merely because compilation passed.
