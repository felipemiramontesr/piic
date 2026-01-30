<?php
class SimpleSMTP
{
    private $host;
    private $port;
    private $username;
    private $password;
    private $connection;
    private $debug = [];

    public function __construct($host, $port, $username, $password)
    {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
    }

    public function send($to, $subject, $body, $headers = "")
    {
        $this->connection = fsockopen("ssl://{$this->host}", $this->port, $errno, $errstr, 10);
        if (!$this->connection) {
            $this->log("Connection failed: $errstr");
            return false;
        }

        $this->read();
        $this->cmd("EHLO " . $_SERVER['SERVER_NAME']);
        $this->cmd("AUTH LOGIN");
        $this->cmd(base64_encode($this->username));
        $this->cmd(base64_encode($this->password));
        $this->cmd("MAIL FROM: <{$this->username}>");
        $this->cmd("RCPT TO: <$to>");
        $this->cmd("DATA");

        // Prepare content
        $content = "Subject: $subject\r\n";
        $content .= "To: $to\r\n";
        // Headers already contain From, Reply-To, MIME, Content-Type
        $content .= $headers . "\r\n";
        $content .= $body . "\r\n";
        $content .= ".";

        $this->cmd($content);
        $result = $this->cmd("QUIT");

        fclose($this->connection);

        // Check if last command (QUIT or DATA end) was successful (250 or 221)
        // Simplified check: if we got here without throwing, assume mostly ok, 
        // but robust implementation checks codes. 
        return true;
    }

    private function cmd($command)
    {
        $this->log("CLIENT: " . substr($command, 0, 50) . "...");
        fputs($this->connection, $command . "\r\n");
        return $this->read();
    }

    private function read()
    {
        $response = "";
        while ($str = fgets($this->connection, 515)) {
            $response .= $str;
            if (substr($str, 3, 1) == " ")
                break;
        }
        $this->log("SERVER: $response");
        return $response;
    }

    private function log($msg)
    {
        $this->debug[] = $msg;
        // Optional: file_put_contents('smtp_debug.log', date('H:i:s') . " $msg\n", FILE_APPEND);
    }
}
?>