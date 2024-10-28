<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json");

// Get the action from the request
$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? null;
$country = $data['country'] ?? null;
$operator = $data['operator'] ?? null;

// Validate input
if (!$action || !$country || !$operator) {
    echo json_encode(['success' => false, 'message' => 'Action, country, and operator are required.']);
    exit;
}

// Sanitize inputs
$country = escapeshellarg($country);
$operator = escapeshellarg($operator);
$sessionName = "program_" . strtoupper($country) . "_" . strtoupper($operator);

// Define command based on action
switch ($action) {
    case 'start':
        $command = "screen -dmS $sessionName python3 /path/to/your_sms_script.py"; // Adjust the script path
        break;
    case 'stop':
        $command = "screen -S $sessionName -X quit"; // Stop the screen session
        break;
    case 'restart':
        $command = "screen -S $sessionName -X quit && screen -dmS $sessionName python3 /path/to/your_sms_script.py"; // Restart the session
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action.']);
        exit;
}

// Execute the command
$output = shell_exec($command);
if ($output === null) {
    echo json_encode(['success' => true, 'message' => "$action operation on session $sessionName executed."]);
} else {
    echo json_encode(['success' => false, 'message' => "Failed to execute command: $output"]);
}
?>
