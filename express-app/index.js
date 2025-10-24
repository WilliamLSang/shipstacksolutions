const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging
app.use(morgan('dev'));

// Serve static site from the sibling html directory
const staticPath = path.join(__dirname, '..', 'html');
app.use(express.static(staticPath));

// JSON parsing for API endpoints
app.use(express.json());

// Basic routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Fallback route: send the static index.html for any unknown GET (SPA-friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ShipStack Express server running on http://localhost:${PORT}`);
});
