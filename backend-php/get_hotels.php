<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "hotel");

if ($conn->connect_error) {
    die(json_encode(["error" => "Lỗi kết nối CSDL"]));
}

$sql = "SELECT * FROM hotels";
$result = $conn->query($sql);

$hotels = [];
while ($row = $result->fetch_assoc()) {
    $hotels[] = $row;
}

echo json_encode($hotels);
$conn->close();
?>
