<?php
header('Content-Type: application/json');

// Database connection (update with your actual DB connection)
$servername = "localhost";
$username = "root"; // Your DB username
$password = ""; // Your DB password
$dbname = "sms_management"; // Your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Handle different request methods
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Retrieve country-operator pairs
        $result = $conn->query("SELECT * FROM country_operators");
        $operators = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(['status' => 'success', 'data' => $operators]);
        break;

    case 'POST':
        // Add a new country-operator pair
        $data = json_decode(file_get_contents("php://input"), true);
        $country = $data['country'];
        $operator = $data['operator'];
        $highPriority = isset($data['high_priority']) ? $data['high_priority'] : 0;

        $stmt = $conn->prepare("INSERT INTO country_operators (country, operator, high_priority) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $country, $operator, $highPriority);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Country-operator pair added.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to add pair.']);
        }
        break;

    case 'PUT':
        // Update a country-operator pair
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $country = $data['country'];
        $operator = $data['operator'];
        $highPriority = isset($data['high_priority']) ? $data['high_priority'] : 0;

        $stmt = $conn->prepare("UPDATE country_operators SET country = ?, operator = ?, high_priority = ? WHERE id = ?");
        $stmt->bind_param("ssii", $country, $operator, $highPriority, $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Country-operator pair updated.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update pair.']);
        }
        break;

    case 'DELETE':
        // Delete a country-operator pair
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];

        $stmt = $conn->prepare("DELETE FROM country_operators WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Country-operator pair deleted.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete pair.']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
        break;
}

$conn->close();
?>
