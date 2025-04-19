<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");

// Xử lý OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'connect.php';

// Nhận dữ liệu từ cả JSON và FormData
$data = json_decode(file_get_contents('php://input'), true) ?? $_POST;

$name = mysqli_real_escape_string($connect, $data['name'] ?? '');
$password = mysqli_real_escape_string($connect, $data['password'] ?? '');
$email = mysqli_real_escape_string($connect, $data['email'] ?? '');
$phone = mysqli_real_escape_string($connect, $data['phone'] ?? '');

// Validate dữ liệu
if (empty($name) || empty($password) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ thông tin']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email không hợp lệ']);
    exit;
}

// Kiểm tra email tồn tại
$checkEmail = "SELECT email FROM signup WHERE email = '$email'";
$result = mysqli_query($connect, $checkEmail);

if (!$result) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi truy vấn database']);
    exit;
}

if (mysqli_num_rows($result) > 0) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'Email đã tồn tại']);
    exit;
}

// Thêm người dùng mới
$sql = "INSERT INTO signup (name, email, password, phone) VALUES ('$name', '$email', '$password', '$phone')";

if (mysqli_query($connect, $sql)) {
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Đăng ký thành công']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi database: ' . mysqli_error($connect)]);
}

mysqli_close($connect);
?>