# SITE/FM

Independent prompt-to-website creative studio. This new isolated app leaves all other repository content unchanged.

Serve public/ for the frontend. Vercel deploys api/generate.js with Node 22 and @vercel/blob 2.8.0. Connect a PRIVATE Blob store (BLOB_STORE_ID with managed VERCEL_OIDC_TOKEN, or BLOB_READ_WRITE_TOKEN), enable AI Gateway via managed OIDC or AI_GATEWAY_API_KEY, and set a random server-only RATE_LIMIT_SECRET. Never put credentials in public files. GET /api/generate reports configuration, not verified provider credit availability.

Features: real AI HTML/CSS generation, one or two versions, remix parent history, local IndexedDB library, bookmarks, six labeled original studio examples, search/filter, sandboxed desktop/tablet/mobile preview, source copy and HTML export. No community fake data. No accounts, payments, or generated-site publishing in V1. Downloaded sites retain security restrictions. Drafts are not cloud-synced. Briefs and remix source go to AI Gateway/model provider; no secrets should be entered.

Safety: generated HTML is sanitized in an inert template and shown only in an empty-sandbox iframe with a network-blocking CSP. No executable scripts, forms, input fields, third-party resources, event handlers, or external navigation. Quota storage uses atomic Blob ifMatch updates, consistent uncached reads, and fail-closed behavior. Limits: 5 requests/network/day, 30 shared/day, 100 lifetime for this edition, two concurrent jobs. Canceled and failed requests may consume allowance. Raw IPs are not stored, only daily HMAC identifiers. No payment collection or automatic top-ups. Gemini 3.8 Flash via Vercel AI Gateway, 7500 maximum output tokens, 48-second provider timeout.

Art direction: original composition informed by actual Poster Index artworks: AMR Jazz Festival (extreme type scale), Sorry Helvetica (optical repetition), Fumetto (acid colors and expressive lettering). No poster artwork is reproduced. Suno inspires the create/variation/remix interaction only; SITE/FM is independent.
