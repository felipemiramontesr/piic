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
$to_admin = $smtp_user;
$subject_admin = "Nueva Solicitud Web: $name ($company)";
$subject_client = "Hemos recibido tu solicitud - PIIC";

// Branding Constants (CSS/VML)
$logo_css_vml = "
    <!--[if mso]>
    <v:oval xmlns:v='urn:schemas-microsoft-com:vml' fillcolor='#F2B705' stroked='t' strokecolor='#F2B705' style='width:30pt;height:30pt;vertical-align:middle;'>
        <v:fill type='gradient' color2='#0F2A44' angle='90' />
    </v:oval>
    <![endif]-->
    <div style='display: inline-block; width: 40px; height: 40px; border: 4px solid #F2B705; border-radius: 50%; background: linear-gradient(to right, #F2B705 50%, #0F2A44 50%); vertical-align: middle; box-sizing: border-box;'></div>
";

// Section Icons
$icon_data = "<div style='display:inline-block; width:24px; height:24px; background-color:#f2b705; border-radius:4px; position:relative; margin-right:12px; vertical-align:middle; overflow:hidden;'>
                <div style='position:absolute; top:0; left:7px; width:10px; height:4px; background-color:#0F2A44; border-radius:0 0 2px 2px;'></div>
                <div style='position:absolute; top:8px; left:4px; width:16px; height:2px; background-color:#0F2A44; opacity:0.8;'></div>
                <div style='position:absolute; top:13px; left:4px; width:16px; height:2px; background-color:#0F2A44; opacity:0.8;'></div>
                <div style='position:absolute; top:18px; left:4px; width:10px; height:2px; background-color:#0F2A44; opacity:0.8;'></div>
              </div>";

$icon_user = "<div style='display:inline-block; width:24px; height:24px; background-color:#f2b705; border-radius:50%; position:relative; margin-right:12px; vertical-align:middle; overflow:hidden;'>
                <div style='position:absolute; top:4px; left:7px; width:10px; height:10px; background-color:#0F2A44; border-radius:50%;'></div>
                <div style='position:absolute; bottom:-4px; left:2px; width:20px; height:12px; background-color:#0F2A44; border-radius:10px 10px 0 0;'></div>
              </div>";

// --- Build Admin Body (1400px) ---
$body_admin = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
    <div style='max-width: 1400px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>

        <!-- Header Bar -->
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px 40px; border-bottom: 4px solid #f2b705;'>
            <tr>
                <td align='left' style='vertical-align: middle;'>
                    <a href='https://piic.com.mx/' style='text-decoration: none;'>
                        $logo_css_vml
                        <span style='color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-left: 15px; vertical-align: middle; text-transform: uppercase;'>PIIC</span>
                    </a>
                </td>
                <td align='right' style='vertical-align: middle;'>
                    <h1 style='color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;'>Nueva Oportunidad de Negocio</h1>
                    <p style='color: #f2b705; margin: 5px 0 0; font-weight: bold; font-size: 14px;'>Formulario de Contacto General</p>
                </td>
            </tr>
        </table>

        <div style='padding: 40px;'>
            <p style='color: #444; font-size: 16px; margin-bottom: 30px;'>Se ha recibido una nueva solicitud de contacto a través del portal <strong>piic.com.mx</strong>:</p>

            <!-- Section: Remitente -->
            <div style='margin-bottom: 30px;'>
                <h3 style='color: #0F2A44; border-bottom: 2px solid #f2b705; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; text-transform: uppercase; display: flex; align-items: center;'>
                    $icon_user INFORMACIÓN DEL REMITENTE
                </h3>
                <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse: collapse;'>
                    <tr>
                        <td width='40%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #666; font-weight: bold; font-size: 14px;'><span style='color: #f2b705; margin-right: 8px;'>👤</span> Nombre:</td>
                        <td width='60%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #333; font-size: 15px;'>$name</td>
                    </tr>
                    <tr>
                        <td width='40%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #666; font-weight: bold; font-size: 14px;'><span style='color: #f2b705; margin-right: 8px;'>🏢</span> Empresa:</td>
                        <td width='60%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #333; font-size: 15px;'>$company</td>
                    </tr>
                    <tr>
                        <td width='40%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #666; font-weight: bold; font-size: 14px;'><span style='color: #f2b705; margin-right: 8px;'>✉️</span> Email:</td>
                        <td width='60%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #333; font-size: 15px;'><a href='mailto:$email' style='color: #0F2A44; text-decoration: none; font-weight: bold;'>$email</a></td>
                    </tr>
                    <tr>
                        <td width='40%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #666; font-weight: bold; font-size: 14px;'><span style='color: #f2b705; margin-right: 8px;'>📞</span> Teléfono:</td>
                        <td width='60%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #333; font-size: 15px;'>$phone</td>
                    </tr>
                </table>
            </div>

            <!-- Section: Mensaje -->
            <div style='margin-bottom: 30px;'>
                <h3 style='color: #0F2A44; border-bottom: 2px solid #f2b705; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; text-transform: uppercase; display: flex; align-items: center;'>
                    $icon_data REQUERIMIENTO / MENSAJE
                </h3>
                <div style='background-color: #f9f9f9; border: 1px solid #eee; padding: 25px; border-radius: 6px; color: #333; line-height: 1.8; font-size: 16px;'>
                    $message
                </div>
            </div>

            <div style='margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;'>
                Este reporte fue generado automáticamente por el sistema de PIIC.
            </div>
        </div>
    </div>
</body>
</html>
";

// --- Build Client Body (900px) ---
$body_client = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
    <div style='max-width: 900px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>

        <!-- Header Bar -->
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px 40px; border-bottom: 4px solid #f2b705;'>
            <tr>
                <td align='left' style='vertical-align: middle;'>
                    <a href='https://piic.com.mx/' style='text-decoration: none;'>
                        $logo_css_vml
                        <span style='color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-left: 15px; vertical-align: middle; text-transform: uppercase;'>PIIC</span>
                    </a>
                </td>
            </tr>
        </table>

        <div style='padding: 40px;'>
            <h2 style='color: #0F2A44; margin-top: 0; font-size: 24px;'>¡Gracias por contactarnos, $name!</h2>
            <p style='color: #444; font-size: 16px; line-height: 1.6;'>Hemos recibido tu solicitud técnica correctamente.</p>
            <p style='color: #444; font-size: 16px; line-height: 1.6;'>Nuestro equipo de ingeniería revisará tus requerimientos y se pondrá en contacto contigo a la brevedad posible para ofrecerte la solución industrial más eficiente.</p>
            
            <div style='margin: 30px 0; padding: 30px; background-color: #f0f7ff; border-radius: 10px; border-left: 6px solid #0F2A44;'>
                <p style='margin: 0; color: #0F2A44; font-weight: bold; font-size: 18px;'>Tu mensaje ha sido registrado con éxito en nuestro sistema.</p>
            </div>

            <p style='color: #666; font-size: 14px; margin-top: 40px;'>Atentamente,<br><strong>Equipo Comercial PIIC</strong></p>

            <div style='margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;'>
                &copy; " . date('Y') . " Proveedora de Insumos Industriales y Comerciales. Todos los derechos reservados.<br>
                <a href='https://piic.com.mx' style='color: #999; text-decoration: underline;'>www.piic.com.mx</a>
            </div>
        </div>
    </div>
</body>
</html>
";

// 1. Send Admin Email
$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
$headers_admin = "MIME-Version: 1.0\r\n";
$headers_admin .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers_admin .= "From: PIIC Web Notifier <$smtp_user>\r\n";
$headers_admin .= "Reply-To: $email\r\n";

if (!$mailer->send($to_admin, $subject_admin, $body_admin, $headers_admin)) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to send admin notification']);
    exit;
}

// 2. Send Client Auto-reply
$headers_client = "From: PIIC <$smtp_user>\r\n";
$headers_client .= "Content-Type: text/html; charset=UTF-8\r\n";

$mailer->send($email, $subject_client, $body_client, $headers_client);

// Success Response
http_response_code(200);
echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);