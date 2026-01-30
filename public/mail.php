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

// Extract and sanitize data (Using htmlspecialchars for HTML email safety)
$name = htmlspecialchars($data['name'] ?? '', ENT_QUOTES, 'UTF-8');
$company = htmlspecialchars($data['company'] ?? '', ENT_QUOTES, 'UTF-8');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($data['phone'] ?? '', ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($data['message'] ?? '', ENT_QUOTES, 'UTF-8');
$consent = ($data['consent'] ?? false) ? 'Sí' : 'No';

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

// --- Email Configuration with SMTP ---
require_once 'SimpleSMTP.php';

// SMTP Credentials
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 465;
$smtp_user = 'ventas@piic.com.mx';
$smtp_pass = 'Ventaspiic$101609';

$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);

// --- 1. Admin Email (to Sales) ---
$to_admin = "ventas@piic.com.mx";
$subject_admin = "Nuevo Contacto Web: $name ($company)";

$body_admin = "
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
        <p>" . nl2br($message) . "</p>
    </div>
    <div class='footer'>
        Este mensaje fue enviado desde el formulario de contacto web.
    </div>
</body>
</html>
";

$headers_admin = "MIME-Version: 1.0" . "\r\n";
$headers_admin .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers_admin .= "From: Web PIIC <ventas@piic.com.mx>" . "\r\n";
$headers_admin .= "Reply-To: $email" . "\r\n";

// Send Admin Email via SMTP
$admin_success = $mailer->send($to_admin, $subject_admin, $body_admin, $headers_admin);

// --- 2. Client Auto-Reply (to User) ---
$client_subject = "Hemos recibido su solicitud - PIIC";
$client_headers = "MIME-Version: 1.0" . "\r\n";
$client_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$client_headers .= "From: Web PIIC <ventas@piic.com.mx>" . "\r\n";
$client_headers .= "Reply-To: ventas@piic.com.mx" . "\r\n";

$client_body = "
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
        <h2>Gracias por contactar a PIIC</h2>
    </div>
    <div class='content'>
        <p>Estimado/a <strong>$name</strong>,</p>
        <p>Hemos recibido su solicitud correctamente. Nuestro equipo comercial analizará sus requerimientos y se pondrá en contacto con usted a la brevedad posible.</p>
        
        <p><strong>Resumen de su solicitud:</strong></p>
        <p><span class='label'>Empresa:</span> $company</p>
        <p><span class='label'>Mensaje:</span></p>
        <p>" . nl2br($message) . "</p>
    </div>
    <div class='footer'>
        Proveedora de Insumos Industriales y Comerciales<br>
        <a href='mailto:ventas@piic.com.mx'>ventas@piic.com.mx</a>
    </div>
</body>
</html>
";

// Send Client Email via SMTP
$client_success = $mailer->send($email, $client_subject, $client_body, $client_headers);

// --- Logging ---
$logEntry = date('Y-m-d H:i:s') . " - IP: " . $_SERVER['REMOTE_ADDR'] .
    " - AdminSMTP: " . ($admin_success ? 'OK' : 'FAIL') .
    " - ClientSMTP: " . ($client_success ? 'OK' : 'FAIL') .
    " - Email: $email\n";
@file_put_contents('mail_debug.log', $logEntry, FILE_APPEND);

// Response
if ($admin_success) {
    echo json_encode(["status" => "success", "message" => "Mensaje enviado correctamente."]);
} else {
    http_response_code(500);
    $debug_info = "Detalles del error no disponibles.";
    if (file_exists('smtp_debug.log')) {
        $lines = file('smtp_debug.log');
        $debug_info = implode("\n", array_slice($lines, -20));
    }
    echo json_encode([
        "status" => "error",
        "message" => "Error al enviar el mensaje. Revisar consola para detalles.",
        "debug_log" => $debug_info
    ]);
}
?>