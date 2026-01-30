<?php
class SimpleSMTP
{
    private $host;
    private $port;
    private $username;
    private $password;
    private $connection;
    public $log_file = 'smtp_debug.log';

    public function __construct($host, $port, $username, $password)
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
    }

    public function send($to, $subject, $body, $headers = "")
    {
        $this->log("-----------------------------------");
        $this->log("Starting email send to: $to");

        $this->connection = fsockopen("ssl://{$this->host}", $this->port, $errno, $errstr, 10);
        if (!$this->connection) {
            $this->log("Connection failed: $errno - $errstr");
            return false;
        }

        // Read initial greeting (expect 220)
        if (!$this->expect(220))
            return false;

        // EHLO
        if (!$this->cmd("EHLO " . $_SERVER['SERVER_NAME'], 250))
            return false;

        // AUTH LOGIN
        if (!$this->cmd("AUTH LOGIN", 334))
            return false;
        if (!$this->cmd(base64_encode($this->username), 334))
            return false;
        // Verify password (expect 235 Authentication successful)
        if (!$this->cmd(base64_encode($this->password), 235))
            return false;

        // MAIL FROM
        if (!$this->cmd("MAIL FROM: <{$this->username}>", 250))
            return false;

        // RCPT TO
        if (!$this->cmd("RCPT TO: <$to>", 250))
            return false;

        // DATA
        if (!$this->cmd("DATA", 354))
            return false;

        // Content
        $content = "Subject: $subject\r\n";
        $content .= "To: $to\r\n";
        $content .= $headers . "\r\n";
        $content .= $body . "\r\n";
        $content .= "."; // End of message

        // Final send (expect 250 OK)
        if (!$this->cmd($content, 250))
            return false;

        // QUIT
        $this->cmd("QUIT", 221);

        fclose($this->connection);
        $this->log("Email sent successfully to: $to");
        return true;
    }

    private function cmd($command, $expectedCode)
    {
        // Mask password in logs
        $logCommand = $command;
        if (base64_encode($this->password) === $command) {
            $logCommand = "[PASSWORD MASKED]";
        }

        $this->log("CLIENT: " . substr($logCommand, 0, 100));
        fputs($this->connection, $command . "\r\n");

        return $this->expect($expectedCode);
    }

    private function expect($code)
    {
        $response = "";
        while ($str = fgets($this->connection, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ")
                break;
        }
        $this->log("SERVER: " . trim($response));

        $responseCode = substr($response, 0, 3);
        if ($responseCode != $code) {
            $this->log("ERROR: Expected $code, got $responseCode. Aborting.");
            return false;
        }
        return true;
    }

    private function log($msg)
    {
        file_put_contents($this->log_file, date('Y-m-d H:i:s') . " - " . $msg . "\n", FILE_APPEND);
    }
}
?>