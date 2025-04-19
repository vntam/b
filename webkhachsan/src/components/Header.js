import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <nav className="header-nav">
      <ul>
        <li>
          <Link to="/">Trang Chủ</Link>
        </li>
        <li>
          <Link to="/khachsan">Khách Sạn</Link>
        </li>
        <li>
          <Link to="/phong">Phòng</Link>
        </li>
        <li>
          <Link to="/phongdadat">Phòng Đã Đặt</Link>
        </li>
        <li>
          <Link to="/thanhtoan">Thanh Toán</Link>
        </li>
        <li>
          <Link to="/khuyenmai">Khuyến Mãi</Link>
        </li>
        <li>
          <Link to="/review">Review</Link>
        </li>
        <li>
          <Link to="/hotro">Hỗ Trợ</Link>
        </li>
        <li>
          <Link to="/dangki">Đăng Kí</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;