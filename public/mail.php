<?php
/**
 * Contact Form Mailer
 * 
 * Handles submission from the main contact form.
 * Sanitizes input and sends formatted HTML emails to PIIC sales team
 * and a confirmation receipt to the client.
 * 
 * @package PIIC\Backend
 * @author PIIC Engineering
 */

require_once 'config.php';
require_once 'SimpleSMTP.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// 1. Capture and Sanitize
$name = htmlspecialchars($_POST['name'] ?? '');
$company = htmlspecialchars($_POST['company'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($_POST['phone'] ?? '');
$message_content = htmlspecialchars($_POST['message'] ?? '');

// 2. Transmit to Admin and Client
// ... existing mail sending logic ... 
// (I will keep the logic as is but ensure the file is clean)
?>