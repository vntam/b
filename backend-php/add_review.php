<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "username", "password", "hotel");

if ($conn->connect_error) {
    die(json_encode(["message" => "Kết nối thất bại: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$hotel_id = $data['hotel_id'];
$rating = $data['rating'];
$content = $data['content'];
$review_date = $data['review_date'];

$sql = "INSERT INTO Review (user_id, hotel_id, rating, content, review_date) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiss", $user_id, $hotel_id, $rating, $content, $review_date);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "review_id" => $stmt->insert_id]);
} else {
    echo json_encode(["message" => "Lỗi khi thêm đánh giá"]);
}

$stmt->close();
$conn->close();
?>