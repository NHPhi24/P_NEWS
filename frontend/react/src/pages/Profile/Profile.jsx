import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userService } from '../../services/userService';
import { useToast } from '../../hooks/useToast';
import Loading from '../../components/ui/Loading/Loading';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaEdit } from 'react-icons/fa';
import './Profile.scss';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    loadUserProfile();
  }, [user]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Lấy thông tin user từ bảng users đã gộp
      const userResponse = await userService.getUserById(user.id);
      const userData = userResponse.data;
      
      setProfile(userData);
      setFormData({
        full_name: userData.full_name || '',
        phone: userData.phone || '',
        address: userData.address || ''
      });
      showSuccess('Lấy thông tin người dùng thành công')
      
    } catch (err) {
      console.error('Error loading profile:', err);
      showError('Không thể lấy thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError(null);

      // Cập nhật thông tin user (bảng users đã gộp)
      await userService.updateUser(user.id,  {
        username: profile.username,
        email: profile.email,
        role: profile.role,
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address
      });
      
      // Reload profile
      await loadUserProfile();
      showSuccess('Cập nhật thông tin người dùng thành cong');
      setIsEditing(false);
      
    } catch (err) {
      console.error('Error saving profile:', err);
      showError('Không thể cập nhật thông tin người dùng');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      address: profile?.address || ''
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <Loading size="large" text="Đang tải thông tin..." />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="profile-error">
        <div className="container">
          <div className="profile-error__content">
            <h2>Đã có lỗi xảy ra</h2>
            <p>{error}</p>
            <button onClick={loadUserProfile} className="btn btn--primary">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile__header">
          <h1 className="profile__title">
            <FaUser className="profile__title-icon" />
            Thông Tin Cá Nhân
          </h1>
          <p className="profile__subtitle">
            Quản lý thông tin cá nhân của bạn
          </p>
        </div>

        <div className="profile__content">
          <div className="profile-card">
            {/* Basic Info Section */}
            <div className="profile-section">
              <h3 className="profile-section__title">Thông Tin Cơ Bản</h3>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <label className="profile-info__label">
                    <FaUser className="profile-info__icon" />
                    Tên đăng nhập
                  </label>
                  <div className="profile-info__value">
                    {profile?.username}
                  </div>
                </div>

                <div className="profile-info-item">
                  <label className="profile-info__label">
                    <FaEnvelope className="profile-info__icon" />
                    Email
                  </label>
                  <div className="profile-info__value">
                    {profile?.email}
                  </div>
                </div>

                <div className="profile-info-item">
                  <label className="profile-info__label">
                    Vai trò
                  </label>
                  <div className="profile-info__value">
                    <span className={`role-badge role-badge--${profile?.role}`}>
                      {profile?.role === 'admin' ? 'Quản trị viên' : 
                       profile?.role === 'author' ? 'Tác giả' : 'Người dùng'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="profile-section">
              <div className="profile-section__header">
                <h3 className="profile-section__title">Thông Tin Cá Nhân</h3>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn--outline btn--small"
                  >
                    <FaEdit />
                    Chỉnh sửa
                  </button>
                )}
              </div>

              {error && (
                <div className="profile-error-message">
                  {error}
                </div>
              )}

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <label className="profile-info__label">
                    Họ và tên
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="profile-input"
                      placeholder="Nhập họ và tên"
                    />
                  ) : (
                    <div className="profile-info__value">
                      {profile?.full_name || 'Chưa cập nhật'}
                    </div>
                  )}
                </div>

                <div className="profile-info-item">
                  <label className="profile-info__label">
                    <FaPhone className="profile-info__icon" />
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="profile-input"
                      placeholder="Nhập số điện thoại"
                    />
                  ) : (
                    <div className="profile-info__value">
                      {profile?.phone || 'Chưa cập nhật'}
                    </div>
                  )}
                </div>

                <div className="profile-info-item profile-info-item--full">
                  <label className="profile-info__label">
                    <FaMapMarkerAlt className="profile-info__icon" />
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="profile-textarea"
                      placeholder="Nhập địa chỉ"
                      rows="3"
                    />
                  ) : (
                    <div className="profile-info__value">
                      {profile?.address || 'Chưa cập nhật'}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="profile-actions">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="btn btn--primary"
                  >
                    <FaSave />
                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="btn btn--outline"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="profile-section">
              <h3 className="profile-section__title">Thống Kê Tài Khoản</h3>
              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="profile-stat__value">
                    {new Date(profile?.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="profile-stat__label">Ngày tham gia</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat__value">
                    {profile?.role}
                  </div>
                  <div className="profile-stat__label">Loại tài khoản</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;