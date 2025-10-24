const express = require('express');
const router = express.Router();

// Basic JSON endpoints to support the static front-end if desired
router.get('/status', (req, res) => {
  res.json({ status: 'ok', service: 'ShipStack Solutions API' });
});

router.get('/pricing', (req, res) => {
  res.json({
    plans: [
      { id: 'starter', price: '2.00', currency: 'USD', bullets: ['Pick & pack', 'Basic packaging', '3–5 day turnaround'] },
      { id: 'growth', price: '1.50', currency: 'USD', bullets: ['Everything in Starter', 'Branded inserts', '2–3 day turnaround'] },
      { id: 'scale', price: 'custom', currency: 'USD', bullets: ['High volume', 'Dedicated support', 'SLA commitments'] }
    ]
  });
});

router.get('/faq', (req, res) => {
  res.json({
    faqs: [
      { q: 'What turnaround times can we expect?', a: 'Most orders ship within 2–3 business days. Expedited options available.' },
      { q: 'Do you support FBA/FBM and multi‑channel?', a: 'Yes — FBA prep, FBM fulfillment, and DTC across multiple marketplaces.' },
      { q: 'How does pricing work?', a: 'Per‑unit handling with add‑ons for special projects; storage and shipping billed separately.' }
    ]
  });
});

module.exports = router;
