<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// Get JSON input
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// Extract and sanitize data
$name = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
$company = filter_var($data['company'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = filter_var($data['phone'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);
$consent = isset($data['consent']) ? 'Sí' : 'No';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Faltan campos obligatorios."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email inválido."]);
    exit;
}

// Email Configuration
$to = "ventas@piic.com.mx";
$subject = "Nuevo Contacto Web: $name ($company)";

// HTML Email Template
$body = "
<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #0F2A44; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .label { font-weight: bold; color: #0F2A44; }
    .footer { font-size: 12px; color: #666; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
</style>
</head>
<body>
    <div class='header'>
        <h2>Nuevo Mensaje desde PIIC.com.mx</h2>
    </div>
    <div class='content'>
        <p><span class='label'>Nombre:</span> $name</p>
        <p><span class='label'>Empresa:</span> $company</p>
        <p><span class='label'>Email:</span> $email</p>
        <p><span class='label'>Teléfono:</span> $phone</p>
        <p><span class='label'>Solicita Cotización:</span> $consent</p>
        <hr>
        <p><span class='label'>Mensaje:</span></p>
        <p>$message</p>
    </div>
    <div class='footer'>
        Este mensaje fue enviado desde el formulario de contacto web.
    </div>
</body>
</html>
";

// Headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Web PIIC <ventas@piic.com.mx>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Send Email
$additional_parameters = "-fventas@piic.com.mx";
$success = mail($to, $subject, $body, $headers, $additional_parameters);

// Logging
$logEntry = date('Y-m-d H:i:s') . " - IP: " . $_SERVER['REMOTE_ADDR'] . " - Success: " . ($success ? 'YES' : 'NO') . " - Email: $email\n";
file_put_contents('mail_debug.log', $logEntry, FILE_APPEND);

if ($success) {
    echo json_encode(["status" => "success", "message" => "Mensaje enviado correctamente."]);
} else {
    $error = error_get_last()['message'] ?? 'Unknown error';
    file_put_contents('mail_error.log', date('Y-m-d H:i:s') . " - Error: $error\n", FILE_APPEND);
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al enviar el mensaje."]);
}
?>