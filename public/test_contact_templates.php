<?php
/**
 * TEST TOOL: Main Contact Form Email Templates
 * This script allows visual verification of the homologated "Bar Style" emails
 * for the main contact form.
 */

require_once 'config.php';
require_once 'SimpleSMTP.php';

// --- CONFIGURATION ---
$test_client_email = "felipermiramontesr@gmail.com";
$test_admin_email = "info@felipemiramontesr.net";
$test_name = "Felipe Miramontes (TEST)";
$test_company = "PIIC Industrial Solutions";
$test_phone = "492-XXX-XXXX";
$test_message = "Esta es una solicitud de prueba para verificar la homologación de los estilos en el formulario principal. \n\nSe busca validar:\n1. Cabecera 'Bar Style' con Logo CSS.\n2. Iconografía Zero-Weight (Portapapeles y Usuario).\n3. Anchos de 1400px (Reporte) y 900px (Cliente).\n4. Botones y enlaces interactivos.";

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

// Helper to build templates
function get_test_report($name, $company, $email, $phone, $message, $logo, $icon1, $icon2)
{
    return "
    <html>
    <body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
        <div style='max-width: 1400px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px 40px; border-bottom: 4px solid #f2b705;'>
                <tr>
                    <td align='left' style='vertical-align: middle;'>
                        <a href='https://piic.com.mx/' style='text-decoration: none;'>
                            $logo
                            <span style='color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-left: 15px; vertical-align: middle; text-transform: uppercase;'>PIIC</span>
                        </a>
                    </td>
                    <td align='right' style='vertical-align: middle;'>
                        <h1 style='color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;'>Nueva Oportunidad (TEST)</h1>
                    </td>
                </tr>
            </table>
            <div style='padding: 40px;'>
                <div style='margin-bottom: 30px;'>
                    <h3 style='color: #0F2A44; border-bottom: 2px solid #f2b705; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center;'>
                        $icon2 INF. REMITENTE
                    </h3>
                    <table width='100%' cellpadding='10' cellspacing='0' style='border-collapse: collapse;'>
                        <tr><td style='border-bottom: 1px solid #eee;'>👤 <strong>Nombre:</strong> $name</td></tr>
                        <tr><td style='border-bottom: 1px solid #eee;'>🏢 <strong>Empresa:</strong> $company</td></tr>
                        <tr><td style='border-bottom: 1px solid #eee;'>✉️ <strong>Email:</strong> $email</td></tr>
                    </table>
                </div>
                <div style='margin-bottom: 30px;'>
                    <h3 style='color: #0F2A44; border-bottom: 2px solid #f2b705; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; display: flex; align-items: center;'>
                        $icon1 MENSAJE
                    </h3>
                    <div style='background-color: #f9f9f9; padding: 20px; border-radius: 6px;'>$message</div>
                </div>
            </div>
        </div>
    </body>
    </html>";
}

function get_test_client($name, $logo)
{
    return "
    <html>
    <body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
        <div style='max-width: 900px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px 40px; border-bottom: 4px solid #f2b705;'>
                <tr><td align='left'>$logo <span style='color:#fff; font-size:24px; margin-left:10px; vertical-align:middle;'>PIIC</span></td></tr>
            </table>
            <div style='padding: 40px;'>
                <h2 style='color: #0F2A44;'>¡Gracias por contactarnos, $name! (TEST)</h2>
                <p>Esta es una pre-visualización del correo de confirmación homologado.</p>
                <div style='margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px; border-left: 4px solid #0F2A44;'>
                    <strong>Estado:</strong> Solicitud recibida con éxito.
                </div>
            </div>
        </div>
    </body>
    </html>";
}

$preview_admin = get_test_report($test_name, $test_company, $test_client_email, $test_phone, nl2br($test_message), $logo_css_vml, $icon_data, $icon_user);
$preview_client = get_test_client($test_name, $logo_css_vml);

$action = $_GET['send'] ?? '';
$status = '';

if ($action === 'both') {
    $mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
    $headers = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nFrom: PIIC Test <$smtp_user>\r\n";

    $ok_admin = $mailer->send($test_admin_email, "TEST: Reporte Contacto Homologado", $preview_admin, $headers);
    $ok_client = $mailer->send($test_client_email, "TEST: Confirmación Contacto Homologada", $preview_client, $headers);

    if ($ok_admin && $ok_client) {
        $status = "<div style='background:#dcfce7; color:#166534; padding:20px; border-radius:8px; margin-bottom:20px;'>✅ ¡Correos enviados con éxito a <b>$test_admin_email</b> e <b>$test_client_email</b>!</div>";
    } else {
        $status = "<div style='background:#fee2e2; color:#991b1b; padding:20px; border-radius:8px; margin-bottom:20px;'>❌ Error al enviar los correos. Verifique su configuración SMTP.</div>";
    }
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>PIIC | Simulador de Correo Contacto</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #eaeff2;
            margin: 0;
            padding: 40px;
        }

        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .btn-send {
            background: #0F2A44;
            color: #F2B705;
            padding: 12px 25px;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            font-size: 16px;
        }

        .btn-send:hover {
            background: #1a4570;
        }

        .preview-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        .preview-box {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .preview-header {
            padding: 15px 25px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        iframe {
            width: 100%;
            border: none;
            height: 600px;
        }

        .badge {
            background: #e2e8f0;
            color: #475569;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="dashboard">
        <header>
            <div>
                <h1 style="margin:0; color:#0F2A44;">Homologación de Formulario Principal</h1>
                <p style="color:#64748b; margin:5px 0 0;">Previsualización de Reporte (Ventas) y Confirmación (Cliente)
                </p>
            </div>
            <a href="?send=both" class="btn-send">🚀 ENVIAR AMBOS CORREOS DE PRUEBA</a>
        </header>

        <?php echo $status; ?>

        <div class="preview-container">
            <div class="preview-box">
                <div class="preview-header">
                    <strong>1. Reporte para Ventas (info@felipemiramontesr.net)</strong>
                    <span class="badge">1400px Wide</span>
                </div>
                <iframe srcdoc="<?php echo htmlspecialchars($preview_admin); ?>"></iframe>
            </div>

            <div class="preview-box">
                <div class="preview-header">
                    <strong>2. Confirmación para Cliente (felipermiramontesr@gmail.com)</strong>
                    <span class="badge">900px Wide</span>
                </div>
                <iframe srcdoc="<?php echo htmlspecialchars($preview_client); ?>"></iframe>
            </div>
        </div>
    </div>
</body>

</html>