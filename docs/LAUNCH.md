# Production launch gate

The app is not “complete” until this checklist is evidenced against the actual staging environment.

- Dedicated Supabase project confirmed; migration applied once; seed contains only approved brand products.
- RLS and API grants tested for anonymous, customer A, customer B, support, manager and owner accounts. Confirm cross-account addresses, invoices, orders and private uploads are inaccessible.
- Owner-approved logo/photos, real prices, SKU inventory, product options, product details and supported delivery zones entered. Original full-resolution files should replace screenshot crops if available.
- Business contact, GST/tax treatment if applicable, invoice format, shipping, returns, privacy, retention and terms approved by the owner. No made-up promises.
- PIN eligibility tested with supported, unsupported and malformed codes; scheduled/express requests tested only where actually supported.
- Real Razorpay test transaction: browse → personalise → bag → delivery → server total → payment → callback verification → signed webhook → confirmation → admin order → single stock deduction → shipment → customer tracking.
- Razorpay failure, cancellation, retry, forged signature, wrong amount/currency, duplicate webhook/callback, out-of-order events, reservation expiry and late capture tested. A late capture must enter review, not trigger automatic fulfilment.
- Concurrent checkout tests on hosted PostgreSQL confirm no overselling and coupon limits. Embedded tests are serial engine tests and do not replace this hosted concurrency check.
- Refund provider timeout/duplicate protection reconciled; fully refunded returned stock can only be restocked once after an administrator assesses it.
- Transactional email delivery/retry tested with verified sender. The outbox uses stable provider idempotency keys. Check alerts when all eight retry attempts have failed.
- Maintenance job runs reliably every 10 minutes or better. Monitor uncertain gateway/refund jobs, payment-review orders, pending email and stale reservations. Frequent Vercel Cron schedules may require an eligible plan.
- Establish an owner-approved cleanup job for unbound expired personalisation uploads, retained order attachments, abandoned carts, rate-limit records and customer deletion requests. Do not silently delete required fulfilment or financial records.
- Check keyboard focus, gallery Escape behavior, form announcements, mobile navigation and no horizontal overflow at 360/390/430/768/1024/1440px. Inspect the final homepage visually in a browser.
- Test password recovery and email verification redirect URLs. Customer tokens must stay in HttpOnly cookies. Verify no secret appears in browser bundles, URLs or logs.
- Verify production catalogue fails closed during a backend outage, payment controls remain off before configuration and no review/bestseller/discount/shipping claim is fabricated.
- Final standard Next.js build, lint, types, automated tests and hosted end-to-end journey pass. Configure `STORE_MODE=production`, the exact HTTPS origin and launch permission only after sign-off.

No live deployment, live payment, real customer email or account purchase has been performed by the implementation work. The project must not be described as fully production-ready while these external tests remain pending.
