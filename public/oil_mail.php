<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once 'config.php';
require_once 'SimpleSMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// 1. Capture Form Fields
$company_name = $_POST['company_name'] ?? '';
$contact_name = $_POST['contact_name'] ?? '';
$email = $_POST['email'] ?? '';
$oil_amount = $_POST['oil_amount'] ?? '';

// Collect all fields for the email body
$fields = [
    'Datos de la Empresa' => [
        'Compañía' => $_POST['company_name'] ?? '',
        'Dirección' => $_POST['address'] ?? '',
        'Ciudad' => $_POST['city'] ?? '',
        'Estado' => $_POST['state'] ?? '',
        'CP' => $_POST['zip_code'] ?? '',
    ],
    'Contacto' => [
        'Nombre' => $_POST['contact_name'] ?? '',
        'Email' => $_POST['email'] ?? '',
        'Teléfono' => $_POST['phone'] ?? '',
        'Móvil' => $_POST['mobile_phone'] ?? '',
    ],
    'Información del Aceite' => [
        '¿Flota?' => (($_POST['oil_floats'] ?? '') === 'yes' ? 'Sí' : 'No'),
        'Viscosidad' => (($_POST['viscosity'] ?? '') === 'other' ? ($_POST['viscosity_other'] ?? '') : ($_POST['viscosity'] ?? '')),
        'Cantidad (L/día)' => $_POST['oil_amount'] ?? '',
    ],
    'Técnico' => [
        'Voltaje' => ($_POST['voltage'] ?? '') . ' V',
        'Ubicación' => $_POST['location'] ?? '',
        'Contenedor' => (isset($_POST['container_type']) && is_array($_POST['container_type'])) ? implode(', ', $_POST['container_type']) : '',
        'Otro Contenedor' => $_POST['container_other'] ?? '',
    ]
];

// 2. Build HTML Body (Admin Report)
$html_body = "<html><body style='font-family: Arial, sans-serif;'>";
$html_body .= "<h2 style='color: #0F2A44;'>Nuevo Cuestionario: Oil Skimmers</h2>";

foreach ($fields as $section => $data) {
    $html_body .= "<h3 style='background: #eee; padding: 5px;'>$section</h3><ul>";
    foreach ($data as $label => $val) {
        $clean_val = htmlspecialchars($val ?? '');
        $html_body .= "<li><strong>$label:</strong> $clean_val</li>";
    }
    $html_body .= "</ul>";
}
$html_body .= "</body></html>";

// 3. Handle File Attachment
$attachment = null;
if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    $attachment = $_FILES['attachment'];
}

// 4. Construct Multipart Email for Admin
$boundary = md5(time());
$headers = "From: PIIC Forms <$smtp_user>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// -- Email Body Part --
$body = "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $html_body . "\r\n";

// -- Attachment Part --
if ($attachment) {
    $file_content = file_get_contents($attachment['tmp_name']);
    $file_encoded = chunk_split(base64_encode($file_content));
    $filename = $attachment['name'];
    $filetype = $attachment['type'];

    $body .= "--$boundary\r\n";
    $body .= "Content-Type: $filetype; name=\"$filename\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
    $body .= $file_encoded . "\r\n";
}

$body .= "--$boundary--";

// 5. Send to Admin
// The form is filled BY the client (Pedro), so it should be sent TO the Admin (PIIC)
$to_admin = $smtp_user;
$subject_admin = "Cuestionario Oil Skimmers: $company_name";

$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
$admin_sent = $mailer->send($to_admin, $subject_admin, $body, $headers);

// 6. Send Auto-Reply to Client
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $subject_client = "Hemos recibido tu solicitud - PIIC";

    // Industrial Style Header for Client
    $headers_client = "From: PIIC <$smtp_user>\r\n";
    $headers_client .= "Content-Type: text/html; charset=UTF-8\r\n";

    $client_body = '
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-top: 5px solid #0F2A44; border-bottom: 5px solid #0F2A44; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <tr>
                <td style="background-color: #ffffff; text-align: center; padding: 25px; border-bottom: 1px solid #eeeeee;">
                    <img src="https://piic.com.mx/logo.png" alt="PIIC" style="max-width: 180px; height: auto; display: block; margin: 0 auto;">
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px; color: #333333;">
                    <h2 style="color: #0F2A44; margin-top: 0; font-size: 24px;">¡Gracias por contactarnos,<br>' . htmlspecialchars($contact_name) . '!</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #555;">
                        Hemos recibido exitosamente la información técnica de tu aplicación de <strong>Oil Skimmers</strong>.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; color: #555;">
                        Nuestro equipo de ingeniería analizará los datos proporcionados para determinar la mejor solución técnica para tu proceso. Un asesor se pondrá en contacto contigo a la brevedad.
                    </p>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 14px; color: #999;">
                        &copy; ' . date("Y") . ' Proveedora de Insumos Industriales y Comerciales
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>';

    // We don't fail if client email fails, just best effort
    $mailer->send($email, $subject_client, $client_body, $headers_client);
}

if ($admin_sent) {
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send admin email']);
}
?>