import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toastService } from '../services/toastService';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is logged in by verifying session
      // This is a simple implementation - you might want to create a proper endpoint
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        // show success toast on role
        const roleMessage = {
          'admin' : 'Chào mứng Admin trở lại',
          'author' : 'Chào mừng tác giả trở lại',
          'user' : 'Đăng nhập thành công!'
        }
        toastService.success(roleMessage[response.role] || 'Đăng nhập thành công!');
        return { success: true, role: response.role };
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      toastService.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      
      if (response.message) {
        toastService.success('Đăng ký thành công! Vui lòng đăng nhập');
        return { success: true, message: response.message };
      } else {
        throw new Error('Đăng ký thất bại');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Đăng ký thất bại';
      setError(errorMessage);
      toastService.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      toastService.success('Đăng xuất thành công');
    } catch (err) {
      console.error('Logout error:', err);
      toastService.error('Đăng xuất thất bại! Có lỗi xảy ra khi đăng xuất');
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    clearError,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isAuthor: user?.role === 'author'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};