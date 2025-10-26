<?php
// Simple test file to verify PHP is working
header('Content-Type: application/json');

echo json_encode([
    'status' => 'ok',
    'message' => 'PHP is working',
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'php_version' => phpversion(),
    'timestamp' => date('c')
]);
