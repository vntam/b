import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "./Header.js";

function Room() {
  const [rooms, setRooms] = useState([]); // ✅ Thêm dòng này
  const [selectedRoom, setSelectedRoom] = useState(null); // lưu phòng đang chọn

  useEffect(() => {
    // ví dụ lọc phòng theo khu vực HCM
    fetch("http://localhost:8888/BAI2/backend-php/room.php?location=HCM")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleBook = () => {
    alert(`Bạn đã chọn số phòng là: ${selectedRoom.number}`);
  };

  return (
    <div>
      <Header />
      <h2 className="hotel-title">Danh Sách Phòng</h2>

      <div className="hotel-list">
        {rooms.map((room) => (
          <div
            key={room.room_id}
            className="hotel-card"
            onClick={() => handleRoomClick(room)}
          >
            <img
              className="hotel-image"
              src={`http://localhost:8888/BAI2/backend-php/images/${room.image}`}
              alt={`Phòng ${room.number}`}
            />
            <h3>Giá: {room.price} VND</h3>
            <p>Trạng thái: {room.status}</p>
            <p>Khách sạn: {room.hotel_name}</p>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Phòng số {selectedRoom.number}</h2>
            <p><strong>Giá:</strong> {selectedRoom.price}</p>
            <p><strong>Trạng thái:</strong> {selectedRoom.status}</p>
            <p><strong>Khách sạn:</strong> {selectedRoom.hotel_name}</p>
            <button className="book-button" onClick={handleBook}>
              Đặt Phòng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
