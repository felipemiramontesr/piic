<?php
header('Content-Type: application/json');
require_once 'config.php';
require_once 'SimpleSMTP.php';

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
  exit;
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
  exit;
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags($data['name'] ?? ''));
$company = htmlspecialchars(strip_tags($data['company'] ?? 'Pending'));
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags($data['phone'] ?? ''));
$message = nl2br(htmlspecialchars(strip_tags($data['message'] ?? '')));

// Validate required fields
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
  exit;
}

// Configuration
$to_admin = $smtp_user; // Send to self (authenticated user)
$subject_admin = "Nueva Solicitud Web: $name ($company)";
$subject_client = "Hemos recibido tu solicitud - PIIC";

// Logo URL (Must be accessible publicly)
$logo_url = 'https://piic.com.mx/logo.png';

// --- TEMPLATE GENERATOR ---
function get_email_template($is_admin, $data, $logo_url)
{
  $header_bg = '#0F2A44';
  $accent_color = '#00C2CB';
  $text_color = '#333333';

  // Header Content
  $html = '
    <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 5px solid ' . $accent_color . '; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <tr>
          <td style="background-color: ' . $header_bg . '; text-align: center; padding: 25px;">
            <img src="' . $logo_url . '" alt="PIIC" style="max-width: 140px; height: auto; display: block; margin: 0 auto;">
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px; color: ' . $text_color . ';">';

  if ($is_admin) {
    $html .= '
            <h2 style="color: ' . $header_bg . '; margin-top: 0; font-size: 22px; border-bottom: 2px solid #eee; padding-bottom: 15px; margin-bottom: 25px;">Nueva Oportunidad de Negocio</h2>
            
            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f8f9fa; border-left: 4px solid ' . $header_bg . '; width: 100%;">
                <tr><td style="padding: 8px 15px;"><strong style="color: ' . $header_bg . '; width: 100px; display: inline-block;">NOMBRE:</strong> ' . $data['name'] . '</td></tr>
                <tr><td style="padding: 8px 15px;"><strong style="color: ' . $header_bg . '; width: 100px; display: inline-block;">EMPRESA:</strong> ' . $data['company'] . '</td></tr>
                <tr><td style="padding: 8px 15px;"><strong style="color: ' . $header_bg . '; width: 100px; display: inline-block;">EMAIL:</strong> <a href="mailto:' . $data['email'] . '" style="color: ' . $accent_color . '; text-decoration: none;">' . $data['email'] . '</a></td></tr>
                <tr><td style="padding: 8px 15px;"><strong style="color: ' . $header_bg . '; width: 100px; display: inline-block;">TELÉFONO:</strong> ' . $data['phone'] . '</td></tr>
            </table>
            
            <div style="margin-top: 25px;">
                <strong style="color: ' . $header_bg . '; display: block; margin-bottom: 10px;">MENSAJE DEL CLIENTE:</strong>
                <div style="background-color: #fff; border: 1px solid #eee; padding: 15px; color: #555; line-height: 1.6;">
                    ' . $data['message'] . '
                </div>
            </div>';
  } else {
    // Client Auto-reply
    $html .= '
            <h2 style="color: ' . $header_bg . '; margin-top: 0; font-size: 24px;">¡Gracias por contactarnos,<br>' . $data['name'] . '!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #555;"> Hemos recibido tu solicitud correctamente.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Nuestro equipo comercial analizará tus requerimientos y se pondrá en contacto contigo a la brevedad posible para brindarte la mejor solución industrial.</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f0fbff; border-radius: 4px; text-align: center;">
                <p style="margin: 0; color: #0F2A44; font-weight: bold;">Tu solicitud ha sido registrada con éxito.</p>
            </div>';
  }

  // Footer
  $html .= '
          </td>
        </tr>
        <tr>
          <td style="background-color: #eeeeee; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">&copy; ' . date('Y') . ' Proveedora de Insumos Industriales y Comerciales (PIIC).</p>
            <p style="margin: 5px 0 0;"><a href="https://piic.com.mx" style="color: #666; text-decoration: underline;">www.piic.com.mx</a></p>
          </td>
        </tr>
      </table>
    </div>';

  return $html;
}

// Prepare Data for Templates
$template_data = [
  'name' => $name,
  'company' => $company,
  'email' => $email,
  'phone' => $phone,
  'message' => $message
];

// 1. Send Admin Email
$body_admin = get_email_template(true, $template_data, $logo_url);
$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
// Add Reply-To so admin can reply directly to client
$headers_admin = "From: PIIC Web Notifier <$smtp_user>\r\n";
$headers_admin .= "Reply-To: $email\r\n";
$headers_admin .= "MIME-Version: 1.0\r\n";
$headers_admin .= "Content-Type: text/html; charset=UTF-8\r\n";

if (!$mailer->send($to_admin, $subject_admin, $body_admin, $headers_admin)) {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Failed to send admin notification']);
  exit;
}

// 2. Send Client Auto-reply
$body_client = get_email_template(false, $template_data, $logo_url);
$mailer_client = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
$headers_client = "From: Ventas PIIC <$smtp_user>\r\n";
$headers_client .= "MIME-Version: 1.0\r\n";
$headers_client .= "Content-Type: text/html; charset=UTF-8\r\n";

// We don't fail if client email fails, just log it or ignore
$mailer_client->send($email, $subject_client, $body_client, $headers_client);

// Success Response
http_response_code(200);
echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
?>