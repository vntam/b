<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "username", "password", "hotel");

if ($conn->connect_error) {
    die(json_encode(["message" => "Kết nối thất bại: " . $conn->connect_error]));
}

$sql = "SELECT * FROM Review";
$result = $conn->query($sql);

$reviews = [];
while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}

echo json_encode($reviews);
$conn->close();
?>