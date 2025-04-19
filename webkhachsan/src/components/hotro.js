import React from "react";
import Header from "./Header.js";
import './Support.css';  // Import file CSS cho trang hỗ trợ

function Hotro() {
    return (
        <div className="support-container">
            <Header />
            <h1 className="support-title">Trang Hỗ Trợ</h1>
            <div className="support-content">
                <section className="faq-section">
                    <h2>Câu hỏi thường gặp (FAQ)</h2>
                    <ul>
                        <li><strong>Câu hỏi 1:</strong> Làm thế nào để đặt phòng?</li>
                        <p>Trả lời: Bạn chỉ cần vào trang Đặt phòng, chọn ngày và phòng phù hợp, rồi làm theo hướng dẫn.</p>

                        <li><strong>Câu hỏi 2:</strong> Tôi có thể thanh toán bằng cách nào?</li>
                        <p>Trả lời: Bạn có thể thanh toán qua các phương thức như Momo, VNPAY, hoặc thẻ tín dụng.</p>

                        <li><strong>Câu hỏi 3:</strong> Tôi có thể thay đổi thông tin đặt phòng không?</li>
                        <p>Trả lời: Có, bạn có thể thay đổi thông tin qua phần Quản lý đặt phòng trong tài khoản của mình.</p>
                    </ul>
                </section>

                <section className="contact-section">
                    <h2>Liên hệ với chúng tôi</h2>
                    <p>Để được hỗ trợ nhanh chóng, vui lòng liên hệ với chúng tôi qua các kênh dưới đây:</p>
                    <ul>
                        <li><strong>Email:</strong> support@khachsan.com</li>
                        <li><strong>SĐT:</strong> +84 123 456 789</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default Hotro;
