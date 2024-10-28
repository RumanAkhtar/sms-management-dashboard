<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Sample metrics data
$metrics = [
    "totalUsers" => 150,
    "activeSessions" => 75,
    "totalMessagesSent" => 300,
    "totalCountries" => 10
];

// Return JSON response
header('Content-Type: application/json');
echo json_encode($metrics);
?>
