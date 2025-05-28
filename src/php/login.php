<?php
require 'db_connection.php';

header("Access-Control-Allow-Origin: *"); // o pon tu URL específica
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejo de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Obtener datos del cliente
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

// Preparar llamado al stored procedure
$stmt = $conn->prepare("CALL login_user(?, ?)");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode(["status" => "success", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "Credenciales inválidas"]);
}

$stmt->close();
$conn->close();


