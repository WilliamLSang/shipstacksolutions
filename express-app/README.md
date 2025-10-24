ShipStack Express
=================

A minimal Express server that serves the existing static site in `../html` and exposes a tiny API for status/pricing/faq.

Getting started
---------------

1. Install dependencies:

   npm install

2. Run the server locally:

   npm start

3. Open http://localhost:3000 in your browser.

Notes
-----
- The server serves files from the sibling `html/` directory. Keep the `html` folder next to `express-app`.
- API endpoints:
  - GET /api/status
  - GET /api/pricing
  - GET /api/faq

