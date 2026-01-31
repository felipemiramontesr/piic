<?php
header('Content-Type: text/html; charset=UTF-8');
require_once 'config.php';
require_once 'SimpleSMTP.php';

// 1. Definition of Test Data
$company_name = "Industrias Test S.A. de C.V.";
$contact_name = "Felipe Miramontes (TEST)";
$email_client = "felipemiramontesr@gmail.com";
$email_sales = "info@felipemiramontesr.net";

$fields = [
    'Datos de la Empresa' => [
        'Compañía' => $company_name,
        'Dirección (Calle y No.)' => 'Calle Industrial 456',
        'Colonia' => 'Zona Industrial Belenes',
        'Ciudad' => 'Zapopan',
        'Estado' => 'Jalisco',
        'CP' => '45101',
    ],
    'Contacto' => [
        'Nombre' => $contact_name,
        'Email' => $email_client,
        'Teléfono' => '33 1234 5678',
        'Móvil' => '33 9876 5432',
    ],
    'Información del Aceite' => [
        '¿Flota?' => 'Sí',
        'Viscosidad' => 'Media (ISO 46)',
        'Cantidad (L/día)' => '50 L/día',
    ],
    'Técnico' => [
        'Voltaje' => '220 V',
        'Ubicación' => 'Interior (Planta Principal)',
        'Contenedor' => 'Fosa Séptica, Separador API',
        'Otro Contenedor' => 'Tanque elevado',
    ]
];

// --- 2. Build SALES (Admin) Template ---
$html_sales = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
    <div style='max-width: 1400px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
        
        <!-- Header Bar -->
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0F2A44; padding: 20px 40px; border-bottom: 4px solid #f2b705;'>
            <tr>
                <td align='left' style='vertical-align: middle;'>
                    <a href='https://piic.com.mx/' style='text-decoration: none; display: flex; align-items: center;'>
                        <div style='display: inline-block; width: 40px; height: 40px; border: 4px solid #F2B705; border-radius: 50%; background: linear-gradient(to right, #F2B705 50%, #0F2A44 50%); vertical-align: middle; box-sizing: border-box;'></div>
                        <span style='color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: 2px; margin-left: 15px; vertical-align: middle; text-transform: uppercase;'>PIIC</span>
                    </a>
                </td>
                <td align='right' style='vertical-align: middle;'>
                    <h1 style='color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px;'>Nueva Solicitud de Cotización (TEST)</h1>
                    <p style='color: #f2b705; margin: 5px 0 0; font-weight: bold; font-size: 14px;'>Cuestionario Técnico: Oil Skimmers</p>
                </td>
            </tr>
        </table>

        <div style='padding: 40px;'>
            <p style='color: #444; font-size: 16px; margin-bottom: 30px;'><strong>[MODO PRUEBA]</strong> Se ha recibido una solicitud simulada para verificar los estilos del reporte en formato ancho (1400px).</p>
";

foreach ($fields as $section => $data) {
    $html_sales .= "
            <div style='margin-bottom: 30px;'>
                <h3 style='color: #0F2A44; border-bottom: 2px solid #f2b705; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; text-transform: uppercase;'>
                    <span style='background-color: #f2b705; color: #0F2A44; padding: 2px 8px; border-radius: 4px; margin-right: 10px;'>&bull;</span> $section
                </h3>
                <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse: collapse;'>
    ";

    foreach ($data as $label => $val) {
        $html_sales .= "
                    <tr>
                        <td width='40%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #666; font-weight: bold; font-size: 14px;'>$label:</td>
                        <td width='60%' style='padding: 10px; border-bottom: 1px solid #eeeeee; color: #333; font-size: 15px;'>$val</td>
                    </tr>
        ";
    }

    $html_sales .= "
                </table>
            </div>";
}

$html_sales .= "
            <div style='background-color: #FFFBEB; border: 1px solid #FCD34D; padding: 15px; border-radius: 6px; margin-top: 10px; text-align: center; color: #B45309;'>
                📎 Archivo Adjunto Simulado: <strong>esquema_planta.pdf</strong>
            </div>

            <div style='margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;'>
                Este es un mensaje de prueba generado por el sistema PIIC.<br>
                &copy; " . date("Y") . " Proveedora de Insumos Industriales y Comerciales
            </div>
        </div>
    </div>
</body>
</html>";

// --- 3. Build CLIENT Template ---
$html_client = "
<html>
<body style='font-family: Arial, sans-serif; background-color: #f4f7f9; margin: 0; padding: 20px;'>
    <div style='max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #f2b705;'>
        
        <div style='background-color: #0F2A44; padding: 30px; text-align: center;'>
            <div style='display: inline-block; width: 80px; height: 80px; border: 6px solid #F2B705; border-radius: 50%; background: linear-gradient(to right, #F2B705 50%, #0F2A44 50%); box-sizing: border-box; margin-bottom: 15px;'></div>
            <h1 style='color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase;'>¡Solicitud Recibida! (PRUEBA)</h1>
        </div>

        <div style='padding: 30px;'>
            <h2 style='color: #0F2A44; margin-top: 0;'>¡Gracias por contactarnos, " . $contact_name . "!</h2>
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

// --- 4. EXECUTING EMAIL SENDING ---
$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);

$headers_base = "From: PIIC PRUEBAS <$smtp_user>\r\n";
$headers_base .= "MIME-Version: 1.0\r\n";
$headers_base .= "Content-Type: text/html; charset=UTF-8\r\n";

echo "<h2>Estado de Verificación de Email</h2>";

// Send to Sales
$sales_sent = $mailer->send($email_sales, "PRUEBA DISEÑO: Reporte Técnico Ventas", $html_sales, $headers_base);
echo $sales_sent ? "<p style='color: green;'>✅ Correo enviado con éxito a VENTAS ($email_sales)</p>" : "<p style='color: red;'>❌ ERROR al enviar correo a VENTAS</p>";

// Send to Client
$client_sent = $mailer->send($email_client, "PRUEBA DISEÑO: Confirmación Cliente PIIC", $html_client, $headers_base);
echo $client_sent ? "<p style='color: green;'>✅ Correo enviado con éxito al CLIENTE ($email_client)</p>" : "<p style='color: red;'>❌ ERROR al enviar correo al CLIENTE</p>";

echo "<hr><p>Si los correos fueron marcados como enviados, por favor revisa tus bandejas de entrada (y la carpeta de spam o promociones si es necesario) para validar los estilos visuales.</p>";
?>