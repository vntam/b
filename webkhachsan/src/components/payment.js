import React, { useState } from "react";
import Header from "./Header.js";
import "./Payment.css"; // Import file CSS

function Payment() {
  const [bookingId, setBookingId] = useState("");
  const [price, setPrice] = useState("");
  const [method, setMethod] = useState("Momo"); // Default payment method
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!bookingId || !price || !method) {
      setMessage("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/BAI2/backend-php/process_payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingId,
          price: parseFloat(price),
          payment_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
          method,
          status: "pending", // Initial status
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Lỗi server");
      }

      setMessage("Thanh toán thành công! Mã giao dịch: " + data.transaction_code);
      setBookingId("");
      setPrice("");
      setMethod("Momo");
    } catch (error) {
      setMessage(error.message || "Lỗi kết nối đến server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <Header /> {/* Assuming Header contains the navigation bar */}
      <h2>Thanh Toán</h2>

      {message && (
        <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã Đặt Phòng (booking_id):</label>
          <input
            type="text"
            placeholder="Mã Đặt Phòng"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Số Tiền (price):</label>
          <input
            type="number"
            placeholder="Số Tiền"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Phương Thức Thanh Toán (method):</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="Momo">Momo</option>
            <option value="VNPAY">VNPAY</option>
            <option value="CreditCard">Thẻ Tín Dụng</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Thanh Toán"}
        </button>
      </form>
    </div>
  );
}

export default Payment;