<?php
// test_config.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>Diagnóstico de Configuración SMTP</h1>";

if (!file_exists('config.php')) {
    die("<h3 style='color:red'>ERROR: No se encuentra config.php</h3>");
}

require 'config.php';
require 'SimpleSMTP.php';

echo "<p><strong>Configuración leída:</strong></p>";
echo "<ul>";
echo "<li>Host: $smtp_host</li>";
echo "<li>Port: $smtp_port</li>";
echo "<li>User: $smtp_user</li>";
// Show first few chars of pass to verify it's the new one
$mask_pass = substr($smtp_pass, 0, 3) . '...' . substr($smtp_pass, -2);
echo "<li>Pass: $mask_pass (Verificando si es la nueva...)</li>";
echo "</ul>";

$log_file = 'smtp_debug_test.log';
if (file_exists($log_file))
    unlink($log_file);

$mailer = new SimpleSMTP($smtp_host, $smtp_port, $smtp_user, $smtp_pass);
$mailer->log_file = $log_file;

echo "<p>Intentando enviar correo de prueba...</p>";

$to = $smtp_user;
$subject = "Prueba de Configuración Exitosa " . date('H:i:s');
$body = "Si lees esto, config.php funciona correctamente.";
$headers = "From: $smtp_user";

if ($mailer->send($to, $subject, $body, $headers)) {
    echo "<h2 style='color:green'>ÉXITO: Correo enviado.</h2>";
} else {
    echo "<h2 style='color:red'>FALLO: No se pudo enviar.</h2>";
}

echo "<h3>Log de Transacción:</h3>";
if (file_exists($log_file)) {
    echo "<pre>" . htmlspecialchars(file_get_contents($log_file)) . "</pre>";
} else {
    echo "No se generó log.";
}
?>