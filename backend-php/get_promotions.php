<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "username", "password", "hotel");

if ($conn->connect_error) {
    die(json_encode(["message" => "Kết nối thất bại: " . $conn->connect_error]));
}

$sql = "SELECT * FROM Promotion";
$result = $conn->query($sql);

$promotions = [];
while ($row = $result->fetch_assoc()) {
    $promotions[] = $row;
}

echo json_encode($promotions);
$conn->close();
?>