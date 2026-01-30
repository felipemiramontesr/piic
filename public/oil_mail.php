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
// ... capture other fields (simplified for brevity in this script, typically we'd iterate)

// Collect all fields for the email body
$fields = [
    'Datos de la Empresa' => [
        'Compañía' => $_POST['company_name'],
        'Dirección' => $_POST['address'],
        'Ciudad' => $_POST['city_state'],
        'CP' => $_POST['zip_code'],
    ],
    'Contacto' => [
        'Nombre' => $_POST['contact_name'],
        'Email' => $_POST['email'],
        'Teléfono' => $_POST['phone'],
        'Móvil' => $_POST['mobile_phone'],
    ],
    'Información del Aceite' => [
        '¿Flota?' => ($_POST['oil_floats'] === 'yes' ? 'Sí' : 'No'),
        'Viscosidad' => ($_POST['viscosity'] === 'other' ? $_POST['viscosity_other'] : $_POST['viscosity']),
        'Cantidad (L/día)' => $_POST['oil_amount'],
    ],
    'Técnico' => [
        'Voltaje' => $_POST['voltage'] . ' V',
        'Ubicación' => $_POST['location'],
        'Contenedor' => (isset($_POST['container_type']) && is_array($_POST['container_type'])) ? implode(', ', $_POST['container_type']) : '',
        'Otro Contenedor' => $_POST['container_other'] ?? '',
    ]
];

// 2. Build HTML Body
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

// 4. Construct Multipart Email
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

// 5. Send
$to = "ing.pedrofierro@piic.com.mx";
// Fallback if not configured, send to default admin
if (empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL))
    $to = $smtp_user;

$subject = "Cuestionario Oil Skimmers: $company_name";

$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);

if ($mailer->send($to, $subject, $body, $headers)) {
    echo json_encode(['status' => 'success']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send']);
}
?>