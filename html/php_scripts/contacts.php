<?php
// ShipStack Solutions - Contact API Endpoint
// Handles both storing contact submissions (POST) and retrieving them (GET with auth)

// Debug logging (remove in production)
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Request URI: " . $_SERVER['REQUEST_URI']);

require_once 'config.php';

// Set CORS headers
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Initialize contacts file if it doesn't exist
 */
function initializeContactsFile() {
    $dir = dirname(CONTACTS_FILE);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    if (!file_exists(CONTACTS_FILE)) {
        file_put_contents(CONTACTS_FILE, json_encode([]));
    }
}

/**
 * Read contacts from JSON file
 */
function readContacts() {
    initializeContactsFile();
    $json = file_get_contents(CONTACTS_FILE);
    return json_decode($json, true) ?: [];
}

/**
 * Write contacts to JSON file
 */
function writeContacts($contacts) {
    initializeContactsFile();
    return file_put_contents(CONTACTS_FILE, json_encode($contacts, JSON_PRETTY_PRINT));
}

/**
 * Validate email format
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// ========================================
// POST: Save new contact submission
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validate required fields
    if (empty($data['name']) || empty($data['email'])) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Name and email are required fields.'
        ]);
        exit;
    }
    
    // Validate email format
    if (!isValidEmail($data['email'])) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Invalid email format.'
        ]);
        exit;
    }
    
    // Sanitize and prepare contact data
    $contact = [
        'name' => sanitizeInput($data['name']),
        'email' => sanitizeInput($data['email']),
        'volume' => isset($data['volume']) ? sanitizeInput($data['volume']) : '',
        'channels' => isset($data['channels']) ? sanitizeInput($data['channels']) : '',
        'message' => isset($data['message']) ? sanitizeInput($data['message']) : '',
        'timestamp' => date('c') // ISO 8601 format
    ];
    
    // Read existing contacts
    $contacts = readContacts();
    
    // Add new contact
    $contacts[] = $contact;
    
    // Save to file
    if (writeContacts($contacts)) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Contact information received successfully.',
            'contact' => $contact
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to save contact information.'
        ]);
    }
    exit;
}

// ========================================
// GET: Retrieve all contacts (with authentication)
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get credentials from query parameters
    $username = $_GET['username'] ?? '';
    $password = $_GET['password'] ?? '';
    
    // Check if credentials provided
    if (empty($username) || empty($password)) {
        http_response_code(401);
        echo json_encode([
            'error' => 'Username and password are required.'
        ]);
        exit;
    }
    
    // Validate credentials
    if ($username !== ADMIN_USERNAME || $password !== ADMIN_PASSWORD) {
        http_response_code(403);
        echo json_encode([
            'error' => 'Invalid credentials. Access denied.'
        ]);
        exit;
    }
    
    // Read and return contacts
    try {
        $contacts = readContacts();
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'count' => count($contacts),
            'contacts' => $contacts
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to retrieve contacts.',
            'details' => $e->getMessage()
        ]);
    }
    exit;
}

// ========================================
// Unsupported method
// ========================================
error_log("Reached unsupported method handler. Method was: " . $_SERVER['REQUEST_METHOD']);
http_response_code(405);
echo json_encode([
    'error' => 'Method not allowed. Only GET and POST are supported.',
    'received_method' => $_SERVER['REQUEST_METHOD'],
    'debug' => 'Check if POST/GET conditions are being met'
]);
