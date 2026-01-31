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
        'Dirección (Calle y No.)' => $_POST['address'] ?? '',
        'Colonia' => (($_POST['neighborhood'] ?? '') === 'Otra' ? ($_POST['neighborhood_other'] ?? '') : ($_POST['neighborhood'] ?? '')),
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

// 2. Build HTML Body (Branded Admin Report - Wide Version)
$html_body = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
    <div style='max-width: 1400px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
        
        <!-- Header Bar -->
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px 40px; border-bottom: 4px solid #f2b705;'>
            <tr>
                <td align='left' style='vertical-align: middle;'>
                    <a href='https://piic.com.mx/' style='text-decoration: none; display: flex; align-items: center;'>
                        <img src='https://piic.com.mx/logo-email.png' alt='PIIC' style='height: 40px; vertical-align: middle;'>
                        <span style='color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-left: 15px; vertical-align: middle; text-transform: uppercase;'>PIIC</span>
                    </a>
                </td>
                <td align='right' style='vertical-align: middle;'>
                    <h1 style='color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;'>Nueva Solicitud de Cotización</h1>
                    <p style='color: #f2b705; margin: 5px 0 0; font-weight: bold; font-size: 14px;'>Cuestionario Técnico: Oil Skimmers</p>
                </td>
            </tr>
        </table>

        <div style='padding: 40px;'>
            <p style='color: #444; font-size: 16px; margin-bottom: 30px;'>Se ha recibido una nueva solicitud técnica a través del portal <strong>piic.com.mx</strong>. A continuación los detalles:</p>
";

foreach ($fields as $section => $data) {
    $html_body .= "
            <!-- Section: $section -->
            <div style='margin-bottom: 30px;'>
                <h3 style='color: #0F2A44; border-bottom: 2px solid #f2b705; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; text-transform: uppercase;'>
                    <span style='background-color: #f2b705; color: #0F2A44; padding: 2px 8px; border-radius: 4px; margin-right: 10px;'>&bull;</span> $section
                </h3>
                <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse: collapse;'>
    ";

    foreach ($data as $label => $val) {
        $clean_val = htmlspecialchars($val ?? '');
        if (empty($clean_val))
            $clean_val = "<span style='color: #999; font-style: italic;'>No proporcionado</span>";

        $html_body .= "
                    <tr>
                        <td width='40%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #666; font-weight: bold; font-size: 14px;'>$label:</td>
                        <td width='60%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #333; font-size: 15px;'>$clean_val</td>
                    </tr>
        ";
    }

    $html_body .= "
                </table>
            </div>";
}

if ($attachment) {
    $html_body .= "
            <!-- Attachment Notice -->
            <div style='background-color: #FFFBEB; border: 1px solid #FCD34D; padding: 15px; border-radius: 6px; display: flex; align-items: center; margin-top: 10px;'>
                <div style='color: #B45309; font-weight: bold; font-size: 16px;'>
                    📎 Archivo Adjunto: <span style='font-weight: normal; font-size: 14px;'>" . htmlspecialchars($attachment['name']) . "</span>
                </div>
            </div>
    ";
}

$html_body .= "
            <div style='margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;'>
                Este es un mensaje automático generado por el sistema de formularios de PIIC.<br>
                &copy; " . date("Y") . " Proveedora de Insumos Industriales y Comerciales
            </div>
        </div>
    </div>
</body>
</html>";

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

    $client_body = "
    <html>
    <body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
        <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
            
            <!-- Header -->
            <div style='background-color: #0F2A44; padding: 30px; text-align: center;'>
                <img src='https://piic.com.mx/logo.png' alt='PIIC' style='max-width: 150px; margin-bottom: 15px;'>
                <h1 style='color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase;'>¡Solicitud Recibida!</h1>
            </div>

            <div style='padding: 30px;'>
                <h2 style='color: #0F2A44; margin-top: 0;'>¡Gracias por contactarnos, " . htmlspecialchars($contact_name) . "!</h2>
                <p style='color: #444; font-size: 16px; line-height: 1.6;'>
                    Hemos recibido exitosamente la información técnica de tu aplicación para <strong>Oil Skimmers</strong>.
                </p>
                
                <div style='background-color: #f8fafc; border-left: 4px solid #f2b705; padding: 15px; margin: 25px 0;'>
                    <p style='margin: 0; color: #334155; font-size: 15px;'>
                        Nuestro equipo de ingeniería analizará los datos proporcionados para determinar la mejor solución técnica para tu proceso. Un asesor experto se pondrá en contacto contigo a la brevedad.
                    </p>
                </div>

                <p style='color: #666; font-size: 14px;'>
                    Si tienes alguna duda inmediata, puedes responder directamente a este correo.
                </p>

                <div style='margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;'>
                    &copy; " . date("Y") . " Proveedora de Insumos Industriales y Comerciales<br>
                    <a href='https://piic.com.mx' style='color: #0F2A44; text-decoration: none; font-weight: bold;'>piic.com.mx</a>
                </div>
            </div>
        </div>
    </body>
    </html>";

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