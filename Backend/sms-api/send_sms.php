<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);
error_log("PHP script started.");

$data = json_decode(file_get_contents('php://input'), true);
error_log("Received data: " . print_r($data, true));

$phone_number = $data['phone_number'] ?? null;
$proxy = $data['proxy'] ?? null;

if (!$phone_number || !$proxy) {
    error_log("Missing parameters: phone_number or proxy.");
    echo json_encode(['success' => false, 'message' => 'Phone number and proxy are required.']);
    exit;
}

$phone_number = escapeshellarg($phone_number);
$proxy = escapeshellarg($proxy);
$command = "./send_sms.py $phone_number $proxy";

error_log("Executing command: $command");
$output = shell_exec($command);
error_log("Command output: " . $output);

if (strpos($output, 'SMS sent successfully!') !== false) {
    echo json_encode(['success' => true, 'message' => 'SMS sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send SMS.']);
}
?>
