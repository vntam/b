<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "hotel");

if ($conn->connect_error) {
    die(json_encode(["error" => "Lỗi kết nối CSDL"]));
}

$sql = "SELECT * FROM hotels";
// $result = $conn->query($sql);
$result = mysqli_query($conn,$sql);
$hotels = [];
while ($row =mysqli_fetch_assoc($result)) {
    $hotels[] = $row;
}

echo json_encode($hotels);
$conn->close();
?>
