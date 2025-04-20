import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./styles.css";

const locations = ["HCM", "Hà Nội", "Đà Nẵng"];

function KhuVuc() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [roomsByHotel, setRoomsByHotel] = useState({});

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    fetch(`http://localhost:8888/BAI2/backend-php/rooms.php?location=${location}`)
      .then((res) => res.json())
      .then((data) => {
        // Nhóm phòng theo khách sạn
        const grouped = {};
        data.forEach((room) => {
          if (!grouped[room.hotel_name]) grouped[room.hotel_name] = [];
          grouped[room.hotel_name].push(room);
        });
        setRoomsByHotel(grouped);
      });
  };

  return (
    <div>
      <Header />
      <h2 className="hotel-title">Chọn Khu Vực</h2>
      <div className="location-list">
        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocationClick(loc)}
            className="location-button"
          >
            {loc}
          </button>
        ))}
      </div>

      {selectedLocation && (
        <div>
          <h2 className="hotel-title">Danh Sách Phòng - {selectedLocation}</h2>
          {Object.entries(roomsByHotel).map(([hotelName, rooms]) => (
            <div key={hotelName}>
              <h3>{hotelName}</h3>
              <div className="hotel-list">
                {rooms.map((room) => (
                  <div className="hotel-card" key={room.room_id}>
                    <img
                      className="hotel-image"
                      src={`http://localhost:8888/BAI2/backend-php/images/${room.image}`}
                      alt="room"
                    />
                    <h4>Giá: {room.price}</h4>
                    <p>Tình trạng: {room.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KhuVuc;
