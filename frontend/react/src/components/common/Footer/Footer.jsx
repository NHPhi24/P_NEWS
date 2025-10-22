import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__info">
            <h3 className="footer__logo">P_NEWS</h3>
            <p className="footer__description">
              Trang tin tức hàng đầu với những thông tin mới nhất và nóng hổi nhất.
            </p>
          </div>
          
          <div className="footer__links">
            <h4 className="footer__links-title">Liên kết nhanh</h4>
            <a href="/" className="footer__link">Trang chủ</a>
            <a href="/contact" className="footer__link">Liên hệ</a>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; 2024 P_NEWS. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;