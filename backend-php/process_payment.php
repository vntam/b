<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "username", "password", "hotel");

if ($conn->connect_error) {
    die(json_encode(["message" => "Kết nối thất bại: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
$booking_id = $data['booking_id'];
$price = $data['price'];
$payment_date = $data['payment_date'];
$method = $data['method'];
$status = $data['status'];
$transaction_code = uniqid(); // Generate a unique transaction code

$sql = "INSERT INTO Payment (booking_id, price, payment_date, method, status, transaction_code) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("idssss", $booking_id, $price, $payment_date, $method, $status, $transaction_code);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "transaction_code" => $transaction_code]);
} else {
    echo json_encode(["message" => "Lỗi khi lưu thanh toán"]);
}

$stmt->close();
$conn->close();
?>