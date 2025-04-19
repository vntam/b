import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import "./review.css"; // Import file CSS

function Review() {
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user_id: "",
    hotel_id: "",
    rating: "",
    content: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch hotels and reviews on component mount
  useEffect(() => {
    fetch("http://localhost:8888/BAI2/backend-php/get_hotels.php")
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error fetching hotels:", error));

    fetch("http://localhost:8888/BAI2/backend-php/get_reviews.php")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!newReview.user_id || !newReview.hotel_id || !newReview.rating || !newReview.content) {
      setMessage("Vui lòng điền đầy đủ thông tin");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8888/BAI2/backend-php/add_review.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newReview,
          review_date: new Date().toISOString().split("T")[0], // Current date
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Lỗi server");
      }

      setMessage("Thêm đánh giá thành công!");
      setReviews([...reviews, { ...newReview, review_id: data.review_id }]);
      setNewReview({ user_id: "", hotel_id: "", rating: "", content: "" });
    } catch (error) {
      setMessage(error.message || "Lỗi kết nối đến server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="review-container">
      <Header />
      <h2>Đánh Giá Khách Sạn</h2>

      {message && (
        <div className={`message ${message.includes("thành công") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <div className="review-list">
        {reviews.length === 0 ? (
          <p>Chưa có đánh giá nào.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.review_id} className="review-item">
              <p>Khách sạn: {hotels.find((h) => h.hotel_id === review.hotel_id)?.name || "N/A"}</p>
              <p>Điểm: {review.rating}/5</p>
              <p>Nội dung: {review.content}</p>
              <p>Ngày: {review.review_date}</p>
            </div>
          ))
        )}
      </div>

      <h3>Thêm Đánh Giá Mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mã Người Dùng (user_id):</label>
          <input
            type="text"
            name="user_id"
            value={newReview.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Khách Sạn (hotel_id):</label>
          <select name="hotel_id" value={newReview.hotel_id} onChange={handleChange} required>
            <option value="">Chọn khách sạn</option>
            {hotels.map((hotel) => (
              <option key={hotel.hotel_id} value={hotel.hotel_id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Điểm Đánh Giá (rating):</label>
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleChange}
            required
            min="1"
            max="5"
          />
        </div>
        <div className="form-group">
          <label>Nội Dung (content):</label>
          <textarea name="content" value={newReview.content} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Gửi Đánh Giá"}
        </button>
      </form>
    </div>
  );
}

export default Review;