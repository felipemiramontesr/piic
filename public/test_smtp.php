<?php
// Enable error reporting to screen
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>SMTP Diagnostics</h1>";
echo "<pre>";

// Check for required files
if (!file_exists('SimpleSMTP.php')) {
    die("Error: SimpleSMTP.php not found in " . __DIR__);
}

require_once 'SimpleSMTP.php';

// Credentials
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'ventas@piic.com.mx';
$smtp_pass = 'Ventas$101609'; // Single quotes are important for $

echo "Configuration:\n";
echo "Host: $smtp_host\n";
echo "Port: $smtp_port\n";
echo "User: $smtp_user\n";
echo "Pass: " . substr($smtp_pass, 0, 3) . "***\n\n";

// Clear log
$log_file = 'smtp_debug.log';
if (file_exists($log_file)) {
    unlink($log_file);
}

$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
$mailer->log_file = $log_file;

$to = "ventas@piic.com.mx";
$subject = "SMTP Test " . date('Y-m-d H:i:s');
$body = "This is a test email sent from test_smtp.php to verify server configuration.";
$headers = "From: Web PIIC <ventas@piic.com.mx>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "Sending email to $to...\n";
$success = $mailer->send($to, $subject, $body, $headers);

echo "Result: " . ($success ? "SUCCESS" : "FAILURE") . "\n\n";

echo "--- SMTP DEBUG LOG ---\n";
if (file_exists($log_file)) {
    echo htmlspecialchars(file_get_contents($log_file));
} else {
    echo "Log file was not created. Check permissions or script errors.";
}
echo "</pre>";
?>