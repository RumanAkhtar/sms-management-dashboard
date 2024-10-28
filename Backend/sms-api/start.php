<?php
// start.php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve data from the request
    $phone_number = $_POST['phone_number'];
    $proxy = $_POST['proxy'];

    // Call the Python script
    $command = escapeshellcmd("python3 /path/to/your-project/backend/send_sms.py '$phone_number' '$proxy'");
    $output = shell_exec($command);
    
    if ($output) {
        echo json_encode(['message' => 'SMS sent successfully!', 'output' => $output]);
    } else {
        echo json_encode(['message' => 'Failed to send SMS.']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method.']);
}
?>
