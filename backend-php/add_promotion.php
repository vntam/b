<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "username", "password", "hotel");

if ($conn->connect_error) {
    die(json_encode(["message" => "Kết nối thất bại: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
$room_id = $data['room_id'];
$start_date = $data['start_date'];
$end_date = $data['end_date'];
$promotion_name = $data['promotion_name'];
$description = $data['description'];
$discount_value = $data['discount_value'];
$status = $data['status'];

$sql = "INSERT INTO Promotion (room_id, start_date, end_date, status, promotion_name, description, discount_value) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssssd", $room_id, $start_date, $end_date, $status, $promotion_name, $description, $discount_value);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "promotion_id" => $stmt->insert_id]);
} else {
    echo json_encode(["message" => "Lỗi khi thêm khuyến mãi"]);
}

$stmt->close();
$conn->close();
?>