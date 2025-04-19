import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "./Header.js";

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // chứa khách sạn đang chọn

  useEffect(() => {
    fetch("http://localhost:8888/BAI2/backend-php/hotels.php")
    .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };
  const handleBook = () => {
    alert(`Bạn đã chọn đặt phòng tại: ${selectedHotel.name}`);
  };

  return (
    <div>
      <Header />
      <h2 className="hotel-title">Danh Sách Khách Sạn</h2>

      <div className="hotel-list">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotel_id}
            className="hotel-card"
            onClick={() => handleHotelClick(hotel)}
          >
          <img className = "hotel-image" src={`http://localhost:8888/BAI2/backend-php/images/hotel_${hotel.hotel_id}.jpg`} alt={hotel.name} />
          <h3>{hotel.name}</h3>
          <p>{hotel.address}</p>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết */}
      {selectedHotel && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedHotel.name}</h2>
            <p><strong>Địa chỉ:</strong> {selectedHotel.address}</p>
            <p><strong>Điện thoại:</strong> {selectedHotel.phone}</p>
            <p><strong>Email:</strong> {selectedHotel.email}</p>
            <p><strong>Đánh giá:</strong> {selectedHotel.rating}</p>
            <button className="book-button" onClick={handleBook}>
              Đặt Phòng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelList;
