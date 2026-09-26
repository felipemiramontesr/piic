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

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';
require_once 'SimpleSMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// 1. Capture and Sanitize
// Handle both JSON payload (application/json) and FormData/URL-encoded ($_POST)
$data = $_POST;
$raw_input = file_get_contents('php://input');
if (!empty($raw_input)) {
    $json = json_decode($raw_input, true);
    if (is_array($json)) {
        $data = array_merge($data, $json);
    }
}

$name = htmlspecialchars(trim($data['name'] ?? ''));
$company = htmlspecialchars(trim($data['company'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? ''));
$message_content = htmlspecialchars(trim($data['message'] ?? ''));

$consent_val = $data['consent'] ?? false;
$consent_str = ($consent_val === true || $consent_val === 'true' || $consent_val === 'on' || $consent_val === '1' || $consent_val === 1) ? 'Sí' : 'No';

if (empty($name) || empty($email) || empty($message_content)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
    exit;
}

// 2. Build HTML Body (Branded Admin Report)
$html_body = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
    <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px; border-bottom: 4px solid #f2b705;'>
            <tr>
                <td>
                    <span style='color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;'>PIIC</span>
                </td>
                <td align='right'>
                    <span style='color: #ffffff; font-size: 14px; text-transform: uppercase;'>Nuevo Contacto Web</span>
                </td>
            </tr>
        </table>
        <div style='padding: 30px;'>
            <h2 style='color: #0F2A44; margin-top: 0;'>Detalles del Mensaje</h2>
            <table width='100%' style='border-collapse: collapse;'>
                <tr><td style='padding: 10px 0; border-bottom: 1px solid #eee;'><strong>Nombre:</strong></td><td style='padding: 10px 0; border-bottom: 1px solid #eee;'>$name</td></tr>
                <tr><td style='padding: 10px 0; border-bottom: 1px solid #eee;'><strong>Empresa:</strong></td><td style='padding: 10px 0; border-bottom: 1px solid #eee;'>$company</td></tr>
                <tr><td style='padding: 10px 0; border-bottom: 1px solid #eee;'><strong>Email:</strong></td><td style='padding: 10px 0; border-bottom: 1px solid #eee;'>$email</td></tr>
                <tr><td style='padding: 10px 0; border-bottom: 1px solid #eee;'><strong>Teléfono:</strong></td><td style='padding: 10px 0; border-bottom: 1px solid #eee;'>$phone</td></tr>
                <tr><td style='padding: 10px 0; border-bottom: 1px solid #eee;'><strong>¿Solicita cotización?:</strong></td><td style='padding: 10px 0; border-bottom: 1px solid #eee;'>$consent_str</td></tr>
            </table>
            <div style='margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 4px;'>
                <strong style='display: block; margin-bottom: 10px;'>Mensaje:</strong>
                <p style='margin: 0; color: #444; line-height: 1.5;'>$message_content</p>
            </div>
        </div>
    </div>
</body>
</html>";

// 3. Send to Admin
$subject_admin = "Contacto Web: $name - $company";
$headers_admin = "From: PIIC Web <$smtp_user>\r\n";
$headers_admin .= "Reply-To: $email\r\n";
$headers_admin .= "MIME-Version: 1.0\r\n";
$headers_admin .= "Content-Type: text/html; charset=UTF-8\r\n";

$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
$admin_sent = $mailer->send($smtp_user, $subject_admin, $html_body, $headers_admin);

// 4. Send Auto-Reply to Client
if ($admin_sent && !empty($email)) {
    $subject_client = "Gracias por contactar a PIIC";
    $html_client = "
    <html>
    <body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
        <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
            <div style='padding: 30px;'>
                <h2 style='color: #0F2A44;'>¡Hola $name!</h2>
                <p>Hemos recibido tu mensaje correctamente. Un asesor de nuestro equipo se pondrá en contacto contigo a la brevedad.</p>
                <div style='margin-top: 20px; color: #999; font-size: 12px;'>&copy; " . date('Y') . " PIIC - Suministro Industrial y Comercial</div>
            </div>
        </div>
    </body>
    </html>";
    $headers_client = "From: PIIC <$smtp_user>\r\n";
    $headers_client .= "Content-Type: text/html; charset=UTF-8\r\n";
    $mailer->send($email, $subject_client, $html_client, $headers_client);
}

if ($admin_sent) {
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send email']);
}
?>