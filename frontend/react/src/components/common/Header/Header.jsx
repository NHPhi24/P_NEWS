import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { FaUserTie, FaUserShield, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Header.scss';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin, isAuthor } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <Link to="/" className="header__logo" onClick={handleLinkClick}>
            <h1>P_NEWS</h1>
          </Link>

          {/* Navigation */}
          <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
            {/* Main Navigation Links */}
            <div className="header__nav-links">
              <Link to="/" className="header__nav-link" onClick={handleLinkClick}>
                Trang chủ
              </Link>
              
              {/* Dashboard Links for Admin/Author */}
              {isAuthenticated && (isAdmin || isAuthor) && (
                <Link 
                  to={isAdmin ? "/admin/dashboard" : "/author/dashboard"} 
                  className="header__nav-link header__nav-link--dashboard"
                  onClick={handleLinkClick}
                >
                  {isAdmin ? (
                    <>
                      <FaUserShield />
                      Admin Dashboard
                    </>
                  ) : (
                    <>
                      <FaUserTie />
                      Author Dashboard
                    </>
                  )}
                </Link>
              )}
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="header__user-menu">
                <div className="header__user-info">
                  <span className="header__user-greeting">
                    Xin chào, <strong>{user?.username}</strong>
                  </span>
                  <span className="header__user-role">
                    {user?.role === 'admin' && '(Quản trị viên)'}
                    {user?.role === 'author' && '(Tác giả)'}
                    {user?.role === 'user' && '(Người dùng)'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="header__logout-btn"
                >
                  <FaSignOutAlt />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="header__auth-links">
                <Link to="/login" className="header__nav-link" onClick={handleLinkClick}>
                  Đăng nhập
                </Link>
                <Link to="/register" className="header__nav-link header__nav-link--register" onClick={handleLinkClick}>
                  Đăng ký
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="header__menu-toggle"
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;