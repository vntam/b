import React from "react";
import Header from "./Header.js";
import './Home.css';
import HotelList from "./HotelList.js"; // Hiển thị danh sách khách sạn
import SearchBar from "./SearchBar.js"; // Thanh tìm kiếm
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-banner">
        <h1>Khám Phá Những Khách Sạn Tuyệt Vời</h1>
        <p>Đặt phòng dễ dàng và nhanh chóng với giá tốt nhất!</p>
        <SearchBar />
      </div>

      <div className="home-promo">
        <h2>Khuyến Mãi Đặc Biệt</h2>
        <div className="promo-list">
          <div className="promo-item">
            <img src="/images/promo1.jpg" alt="Khuyến mãi 1" />
            <h3>Giảm Giá 50% Cho Đặt Phòng Mới</h3>
            <p>Chỉ áp dụng cho những khách sạn trong tháng này. Đặt ngay hôm nay!</p>
          </div>
          <div className="promo-item">
            <img src="/images/promo2.jpg" alt="Khuyến mãi 2" />
            <h3>Đặt Phòng 3 Đêm, Tặng 1 Đêm Miễn Phí</h3>
            <p>Áp dụng cho các khách sạn tham gia chương trình. Hãy tận hưởng kỳ nghỉ dài hơn!</p>
          </div>
          <div className="promo-item">
            <img src="/images/promo3.jpg" alt="Khuyến mãi 3" />
            <h3>Giảm Giá Sâu Cho Khách Hàng Mới</h3>
            <p>Khách hàng lần đầu đặt phòng sẽ nhận được ưu đãi hấp dẫn. Hãy thử ngay!</p>
          </div>
        </div>
      </div>

      <div className="home-services">
        <h2>Dịch Vụ Nổi Bật</h2>
        <div className="service-list">
          <div className="service-item">
            <h3>Đặt Phòng Trực Tuyến</h3>
            <p>Dễ dàng tìm kiếm và đặt phòng khách sạn chỉ với vài cú nhấp chuột.</p>
            <Link to="/phong" className="btn">Tìm Kiếm Khách Sạn</Link>
          </div>
          <div className="service-item">
            <h3>Thanh Toán An Toàn</h3>
            <p>Hệ thống thanh toán bảo mật và nhanh chóng qua các phương thức thanh toán phổ biến.</p>
            <Link to="/thanhtoan" className="btn">Thanh Toán Ngay</Link>
          </div>
          <div className="service-item">
            <h3>Hỗ Trợ 24/7</h3>
            <p>Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn bất kỳ lúc nào trong suốt quá trình đặt phòng.</p>
            <Link to="/hotro" className="btn">Liên Hệ Hỗ Trợ</Link>
          </div>
        </div>
      </div>



      <div className="home-footer">
        <p>© 2025 Website Khách Sạn. Tất cả các quyền được bảo lưu.</p>
      </div>
    </div>
  );
}

export default Home;
