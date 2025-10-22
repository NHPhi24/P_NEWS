// Contact.js
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaGlobe, FaUsers, FaNewspaper, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact">
      <div className="contact__container">
        {/* Header */}
        <div className="contact__header">
          <h1 className="contact__header-title">Liên Hệ Với Chúng Tôi</h1>
          <p className="contact__header-subtitle">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ để được tư vấn và giải đáp mọi thắc mắc.
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="contact-success">
            <FaCheckCircle className="contact-success__icon" />
            <h3 className="contact-success__title">Gửi Thành Công!</h3>
            <p className="contact-success__message">
              Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
          </div>
        )}

        {/* Contact Content */}
        <div className="contact__content">
          {/* Contact Information */}
          <div className="contact__info">
            <h2 className="contact__info-title">Thông Tin Liên Hệ</h2>
            
            <div className="contact__info-item">
              <div className="contact__info-item-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact__info-item-content">
                <h4>Địa Chỉ</h4>
                <p>
                  123 Đường ABC, Thư Lâm, Hà Nội
                </p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-item-icon">
                <FaPhone />
              </div>
              <div className="contact__info-item-content">
                <h4>Điện Thoại</h4>
                <p>
                  <a href="tel:0357212084">+84 357 212 084</a><br />
                </p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-item-icon">
                <FaEnvelope />
              </div>
              <div className="contact__info-item-content">
                <h4>Email</h4>
                <p>
                  <a href="mailto:contact@pnews.com">contact@pnews.com</a><br />
                  <a href="mailto:support@pnews.com">support@pnews.com</a>
                </p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-item-icon">
                <FaClock />
              </div>
              <div className="contact__info-item-content">
                <h4>Giờ Làm Việc</h4>
                <p>
                  Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                  Thứ 7: 8:00 - 12:00<br />
                  Chủ nhật: Nghỉ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About P_NEWS Section */}
        <div className="contact__about">
          <h2 className="contact__about-title">Về P_NEWS</h2>
          
          <div className="contact__about-content">
            <div className="contact__about-card">
              <div className="contact__about-card-icon">
                <FaGlobe />
              </div>
              <h3 className="contact__about-card-title">Sứ Mệnh</h3>
              <p className="contact__about-card-description">
                Cung cấp thông tin tin tức nhanh chóng, chính xác và đa dạng, 
                đáp ứng nhu cầu cập nhật thông tin của cộng đồng trong thời đại số.
              </p>
            </div>

            <div className="contact__about-card">
              <div className="contact__about-card-icon">
                <FaUsers />
              </div>
              <h3 className="contact__about-card-title">Đội Ngũ</h3>
              <p className="contact__about-card-description">
                Đội ngũ phóng viên, biên tập viên chuyên nghiệp, 
                giàu kinh nghiệm và luôn tận tâm với nghề, 
                cam kết mang đến những bài báo chất lượng nhất.
              </p>
            </div>

            <div className="contact__about-card">
              <div className="contact__about-card-icon">
                <FaNewspaper />
              </div>
              <h3 className="contact__about-card-title">Nội Dung</h3>
              <p className="contact__about-card-description">
                Đa dạng thể loại: thời sự, kinh tế, văn hóa, 
                giải trí, thể thao, công nghệ và nhiều lĩnh vực khác, 
                đáp ứng mọi nhu cầu thông tin của độc giả.
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="contact__map">
          <div className="contact__map-placeholder">
            <FaMapMarkerAlt size={48} />
            <h3>Vị Trí Của Chúng Tôi</h3>
            <p>123 Đường ABC, Thư lâm, Hà Nội</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;