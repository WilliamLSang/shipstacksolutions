<?php
// Configuration file for ShipStack Solutions API
// Copy this file to config.php and update with your credentials

// Admin credentials
define('ADMIN_USERNAME', 'your_username_here');
define('ADMIN_PASSWORD', 'your_password_here');

// Data file path - points to data folder at workspace root
define('CONTACTS_FILE', __DIR__ . '/../../data/contacts.json');

// CORS settings - adjust for production
define('ALLOWED_ORIGIN', '*'); // Change to specific domain in production

// Timezone
date_default_timezone_set('UTC');

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 0 in production
ini_set('log_errors', 1);
