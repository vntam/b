import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import "./KhuyenMai.css"; // Import file CSS

function KhuyenMai() {
  const [promotions, setPromotions] = useState([]);
  const [newPromo, setNewPromo] = useState({
    room_id: "",
    start_date: "",
    end_date: "",
    promotion_name: "",
    description: "",
    discount_value: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch promotions on component mount
  useEffect(() => {
    fetch("http://localhost:8888/BAI2/backend-php/get_promotions.php")
      .then((response) => response.json())
      .then((data) => setPromotions(data))
      .catch((error) => {
        console.error("Error fetching promotions:", error);
        setMessage("Lỗi tải dữ liệu khuyến mãi");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPromo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (
      !newPromo.room_id ||
      !newPromo.start_date ||
      !newPromo.end_date ||
      !newPromo.promotion_name ||
      !newPromo.discount_value
    ) {
      setMessage("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/BAI2/backend-php/add_promotion.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newPromo, status: "active" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Lỗi server");
      }

      setMessage("Thêm khuyến mãi thành công!");
      setPromotions([...promotions, { ...newPromo, promotion_id: data.promotion_id }]);
      setNewPromo({
        room_id: "",
        start_date: "",
        end_date: "",
        promotion_name: "",
        description: "",
        discount_value: "",
      });
    } catch (error) {
      setMessage(error.message || "Lỗi kết nối đến server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="khuyenmai-container">
      <Header />
      <h2>Khuyến Mãi</h2>

      {message && (
        <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="promotion-list">
        {promotions.length === 0 ? (
          <p>Không có khuyến mãi nào.</p>
        ) : (
          promotions.map((promo) => (
            <div key={promo.promotion_id} className="promotion-item">
              <h3>{promo.promotion_name}</h3>
              <p>Mô tả: {promo.description || "Không có mô tả"}</p>
              <p>Phòng: {promo.room_id}</p>
              <p>Giảm giá: {promo.discount_value}%</p>
              <p>Thời gian: {promo.start_date} - {promo.end_date}</p>
              <p>Trạng thái: {promo.status}</p>
            </div>
          ))
        )}
      </div>

      <h3>Thêm Khuyến Mãi Mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã Phòng (room_id):</label>
          <input
            type="text"
            name="room_id"
            value={newPromo.room_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tên Khuyến Mãi (promotion_name):</label>
          <input
            type="text"
            name="promotion_name"
            value={newPromo.promotion_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mô Tả (description):</label>
          <textarea
            name="description"
            value={newPromo.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ngày Bắt Đầu (start_date):</label>
          <input
            type="date"
            name="start_date"
            value={newPromo.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ngày Kết Thúc (end_date):</label>
          <input
            type="date"
            name="end_date"
            value={newPromo.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Giảm Giá (%):</label>
          <input
            type="number"
            name="discount_value"
            value={newPromo.discount_value}
            onChange={handleChange}
            required
            min="0"
            max="100"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Thêm Khuyến Mãi"}
        </button>
      </form>
    </div>
  );
}

export default KhuyenMai;