# ShipStack Solutions - PHP API

This folder contains the PHP backend API for ShipStack Solutions contact form and admin features.

## Files

- **contacts.php** - Main API endpoint that handles:
  - `POST` - Save contact form submissions
  - `GET` - Retrieve all contacts (requires authentication)
  
- **config.php** - Configuration file with credentials (NOT in git)
- **config.example.php** - Template for configuration
- **.htaccess** - Apache configuration for CORS and security

## Setup

1. **Copy the config template:**
   ```bash
   cp config.example.php config.php
   ```

2. **Edit config.php** and set your credentials:
   ```php
   define('ADMIN_USERNAME', 'your_username');
   define('ADMIN_PASSWORD', 'your_secure_password');
   ```

3. **Ensure Apache modules are enabled:**
   - mod_headers (for CORS)
   - mod_rewrite (for OPTIONS handling)

4. **Set proper permissions:**
   ```bash
   chmod 755 php_scripts/
   chmod 644 php_scripts/*.php
   chmod 600 php_scripts/config.php
   ```

## API Endpoints

### POST /php_scripts/contacts.php
Submit a new contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "volume": "100-500",
  "channels": "Shopify, Amazon",
  "message": "Need fulfillment services"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Contact information received successfully.",
  "contact": { ... }
}
```

### GET /php_scripts/contacts.php?username=X&password=Y
Retrieve all contacts (admin only).

**Query Parameters:**
- `username` - Admin username
- `password` - Admin password

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "contacts": [ ... ]
}
```

**Error Responses:**
- `401` - Missing credentials
- `403` - Invalid credentials
- `400` - Invalid request data
- `500` - Server error

## Security Notes

- `config.php` is excluded from git via `.gitignore`
- `.htaccess` denies direct access to `config.php`
- All input is sanitized before storage
- Email addresses are validated
- Passwords should be changed from defaults
- In production, set `ALLOWED_ORIGIN` to your specific domain

## Data Storage

Contact submissions are stored in:
```
../data/contacts.json
```

This file is created automatically if it doesn't exist.

## Frontend Integration

The following pages use this API:
- `html/contact.html` - Submits contact forms
- `html/view_contacts.html` - Admin view for all contacts

## Testing

You can test the API with curl:

```bash
# Submit a contact
curl -X POST http://localhost/php_scripts/contacts.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Retrieve contacts (with auth)
curl "http://localhost/php_scripts/contacts.php?username=robert&password=88888888"
```
