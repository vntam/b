import React, { useState } from 'react';
import './dangki.css';

function DangKy() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        // Validate client-side
        if (!formData.name || !formData.password || !formData.email || !formData.phone) {
            setMessage('Vui lòng điền đầy đủ thông tin');
            setIsLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setMessage('Email không hợp lệ');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8888/BAI2/backend-php/process_signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Lỗi server (${response.status})`);
            }

            setMessage('Đăng ký thành công!');
            setFormData({ name: '', password: '', email: '', phone: '' });
        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Lỗi kết nối đến server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dangky-container">
            <h2>Đăng Ký Tài Khoản</h2>
            
            {message && (
                <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
                
                <div className="form-group">
                    <label>Email:</label>
                    
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10,11}"
                        title="Số điện thoại phải có 10-11 chữ số"
                    />
                </div>
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
            </form>
        </div>
    );
}

export default DangKy;