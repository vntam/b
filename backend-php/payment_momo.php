<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$amount = $data['amount'] ?? 0;

echo json_encode([
    "success" => true,
    "redirectUrl" => "https://momo.vn/fake-payment?amount=$amount"
]);
?>
