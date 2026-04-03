import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">

        <div className="footer-container">

          {/* COLUMN 1 */}
          <div className="footer-col">
            <h4>Tổng đài hỗ trợ miễn phí</h4>
            <p>Mua hàng: <b>1800.2097</b></p>
            <p>Khiếu nại: <b>1800.2063</b></p>

            <h4>Phương thức thanh toán</h4>
            <div className="payment-box">
              <span>💳</span>
              <span>VNPay</span>
              <span>Momo</span>
              <span>ZaloPay</span>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="footer-col">
            <h4>Thông tin</h4>
            <p>Mua hàng online</p>
            <p>Chính sách bảo hành</p>
            <p>Chính sách đổi trả</p>
            <p>Tra cứu đơn hàng</p>
          </div>

          {/* COLUMN 3 */}
          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <p>Khách hàng doanh nghiệp</p>
            <p>Ưu đãi thanh toán</p>
            <p>Tuyển dụng</p>
          </div>

          {/* COLUMN 4 */}
          <div className="footer-col">
            <h4>Kết nối</h4>
            <div className="social">
              <span>📘</span>
              <span>▶️</span>
              <span>📸</span>
              <span>🎵</span>
            </div>

            <h4>Đăng ký nhận tin</h4>
            <input placeholder="Email của bạn" />
            <button>Đăng ký</button>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          © 2026 VLUShop - All rights reserved
        </div>

      </div>
    );
  }
}

export default Footer;