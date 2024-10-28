<?php
header('Content-Type: application/json');

// Simulate stopping a program
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $country = $data['country'];
    $operator = $data['operator'];

    $sessionName = "program_" . strtoupper($country) . "_" . strtoupper($operator);
    $command = "screen -S $sessionName -X quit"; // Stop the screen session

    exec($command, $output, $return_var);

    if ($return_var === 0) {
        echo json_encode(['status' => 'success', 'message' => "Session $sessionName stopped."]);
    } else {
        echo json_encode(['status' => 'error', 'message' => "Failed to stop session."]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
