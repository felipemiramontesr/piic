<?php

/**
 * SimpleSMTP
 *
 * A lightweight SMTP client for sending emails via sockets.
 * Optimized for performance and minimal dependencies.
 *
 * @package PIIC\Backend
 * @version 1.0.0
 * @author PIIC Engineering
 */
class SimpleSMTP
{
    /** @var string SMTP server hostname */
    private $host;

    /** @var int SMTP server port */
    private $port;

    /** @var string SMTP username */
    private $username;

    /** @var string SMTP password */
    private $password;

    /** @var resource|false Socket connection handle */
    private $connection;

    /** @var string Debug log file path */
    public $log_file = 'smtp_debug.log';

    /**
     * Constructor
     * 
     * @param string $host
     * @param int $port
     * @param string $username
     * @param string $password
     */
    public function __construct($host, $port, $username, $password)
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * Sends an email via SMTP
     * 
     * @param string $to
     * @param string $subject
     * @param string $body
     * @param string $headers
     * @return bool
     */
    public function send($to, $subject, $body, $headers = "")
    {
        $this->log("-----------------------------------");
        $this->log("Starting email send to: $to");

        $this->connection = fsockopen("ssl://{$this->host}", $this->port, $errno, $errstr, 10);
        if (!$this->connection) {
            $this->log("Connection failed: $errno - $errstr");
            return false;
        }

        if (!$this->expect(220)) {
            return false;
        }

        if (!$this->cmd("EHLO " . ($_SERVER['SERVER_NAME'] ?? 'localhost'), 250)) {
            return false;
        }

        if (!$this->cmd("AUTH LOGIN", 334)) {
            return false;
        }
        if (!$this->cmd(base64_encode($this->username), 334)) {
            return false;
        }
        if (!$this->cmd(base64_encode($this->password), 235)) {
            return false;
        }

        if (!$this->cmd("MAIL FROM: <{$this->username}>", 250)) {
            return false;
        }

        if (!$this->cmd("RCPT TO: <$to>", 250)) {
            return false;
        }

        if (!$this->cmd("DATA", 354)) {
            return false;
        }

        $content = "Subject: $subject\r\n";
        $content .= "To: $to\r\n";
        $content .= $headers . "\r\n";
        $content .= $body . "\r\n";
        $content .= ".";

        if (!$this->cmd($content, 250)) {
            return false;
        }

        $this->cmd("QUIT", 221);
        fclose($this->connection);
        $this->log("Email sent successfully to: $to");
        return true;
    }

    /**
     * Sends an SMTP command and checks response
     */
    private function cmd($command, $expectedCode)
    {
        $logCommand = $command;
        if (base64_encode($this->password) === $command) {
            $logCommand = "[PASSWORD MASKED]";
        }

        $this->log("CLIENT: " . substr($logCommand, 0, 100));
        fputs($this->connection, $command . "\r\n");

        return $this->expect($expectedCode);
    }

    /**
     * Reads server response and validates status code
     */
    private function expect($code)
    {
        $response = "";
        while ($str = fgets($this->connection, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ") {
                break;
            }
        }
        $this->log("SERVER: " . trim($response));

        $responseCode = substr($response, 0, 3);
        if ($responseCode != $code) {
            $this->log("ERROR: Expected $code, got $responseCode. Aborting.");
            return false;
        }
        return true;
    }

    /**
     * Writes to debug log
     */
    private function log($msg)
    {
        file_put_contents($this->log_file, date('Y-m-d H:i:s') . " - " . $msg . "\n", FILE_APPEND);
    }
}