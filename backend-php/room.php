<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Kết nối database
$conn = new mysqli("localhost", "root", "", "hotel");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$location = isset($_GET['location']) ? $_GET['location'] : '';

if (!$location) {
    echo json_encode(["error" => "No location provided"]);
    exit;
}

$sql = "SELECT 
            r.room_id,
            r.number,
            r.price,
            r.status,
            h.hotel_id,
            h.name AS hotel_name,
            h.location
        FROM rooms r
        JOIN hotels h ON r.hotel_id = h.hotel_id
        WHERE h.location = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $location);
$stmt->execute();
$result = $stmt->get_result();

$rooms = [];

while ($row = $result->fetch_assoc()) {
    // Thêm ảnh theo room_id (giả sử ảnh lưu tên là room_<room_id>.jpg)
    $row['image'] = "room_" . $row['room_id'] . ".jpg";
    $rooms[] = $row;
}

echo json_encode($rooms);
$conn->close();
?>
