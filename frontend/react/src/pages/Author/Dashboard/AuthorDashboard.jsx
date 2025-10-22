import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaNewspaper, 
  FaEye, 
  FaPlus,
  FaEdit,
  FaTrash,
  FaFire,
  FaUserEdit,
  FaChartLine,
  FaSync,
  FaHome
} from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { dashboardService } from '../../../services/dashboardService';
import Loading from '../../../components/ui/Loading/Loading';
import DataTable from '../../../components/ui/DataTable/DataTable';
import Pagination from '../../../components/ui/Pagination/Pagination';
import './AuthorDashboard.scss';

const AuthorDashboard = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [activeTab, setActiveTab] = useState('news');
  const [stats, setStats] = useState({
    totalNews: 0,
    totalViews: 0,
    hotNewsCount: 0,
    recentNews: []
  });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab === 'news') {
      loadAuthorNews();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const statsRes = await dashboardService.getAuthorStats();
      if (statsRes.success) {
        setStats(statsRes.data);
      } else {
        showError('Không thể tải thống kê dashboard');
      }
    } catch (err) {
      console.error('Error loading author dashboard:', err);
      if (err.response?.status === 401) {
        showError('Phiên đăng nhập hết hạn');
      } else if (err.response?.status === 403) {
        showError('Bạn không có quyền truy cập dashboard author');
      } else {
        showError('Không thể tải thống kê dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAuthorNews = async () => {
    try {
      setTableLoading(true);
      const newsRes = await dashboardService.getAuthorNews();
      if (newsRes.success) {
        setNews(newsRes.data);
      } else {
        showError('Không thể tải danh sách tin tức');
      }
    } catch (err) {
      console.error('Error loading author news:', err);
      showError('Không thể tải danh sách tin tức');
    } finally {
      setTableLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await Promise.all([loadDashboardData(), loadAuthorNews()]);
      showSuccess('Đã cập nhật dữ liệu mới nhất');
    } catch (err) {
      showError('Lỗi khi làm mới dữ liệu');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin này? Hành động này không thể hoàn tác.')) return;

    try {
      const result = await dashboardService.deleteNews(id);
      if (result.success) {
        setNews(news.filter(item => item.id !== id));
        // Update stats after deletion
        setStats(prev => ({
          ...prev,
          totalNews: prev.totalNews - 1
        }));
        showSuccess('Xóa tin thành công');
      }
    } catch (err) {
      console.error('Error deleting news:', err);
      showError('Lỗi khi xóa tin');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Loading size="large" text="Đang tải dashboard..." />
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // lấy dữ liệu cho trang hiện tại
  const getCurrentData = () => {
    const startIndex = (currentPage -1 ) *itemsPerPage
    const endIndex = startIndex + itemsPerPage;
    return news.slice(startIndex, endIndex);
  }

  // tổng số sang
  const getTotalPages = () => { 
    return Math.ceil(news.length / itemsPerPage);
  }

  if(loading) return <Loading text="Đang tải dashboard..." />
  const currentData = getCurrentData();
  const totalPages = getTotalPages();

  return (
    <div className="author-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Author Dashboard</h1>
          <p>Chào mừng trở lại, <strong>{user?.username}</strong>!</p>
          <span className="user-role">Vai trò: {user?.role === 'author' ? 'Tác giả' : user?.role}</span>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-secondary btn-refresh"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <FaSync className={refreshing ? 'spinning' : ''} />
            {refreshing ? 'Đang tải...' : 'Làm mới'}
          </button>
          <Link to="/author/news/create" className="btn btn-primary">
            <FaPlus />
            Thêm Tin Mới
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <FaNewspaper />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalNews || 0}</div>
            <div className="stat-label">Tin Của Bạn</div>
            <div className="stat-trend">Tổng số bài viết</div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">
            <FaEye />
          </div>
          <div className="stat-content">
            <div className="stat-value">{(stats.totalViews || 0).toLocaleString('vi-VN')}</div>
            <div className="stat-label">Tổng Lượt Xem</div>
            <div className="stat-trend">Tất cả bài viết</div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">
            <FaFire />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.hotNewsCount || 0}</div>
            <div className="stat-label">Tin Nổi Bật</div>
            <div className="stat-trend">Bài viết hot</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.recentNews?.length || 0}</div>
            <div className="stat-label">Tin Gần Đây</div>
            <div className="stat-trend">5 bài mới nhất</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        <button 
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <FaNewspaper /> Quản lý Tin tức
        </button>
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUserEdit /> Xem Hồ sơ
        </button>
      </div>

      {/* Table Content */}
      <div className="tab-content">
        {tableLoading && activeTab === 'news' ? (
          <div className="table-loading">
            <Loading text="Đang tải danh sách tin tức..." />
          </div>
        ) : (
          <>
            {/* News Table */}
            {activeTab === 'news' && (
              <div className="news-section">
                <DataTable
                  title={`Danh sách Tin tức của bạn (${news.length} tin)`}
                  data={news}
                  columns={[
                    { key: 'id', label: 'ID', width: '80px' },
                    { 
                      key: 'title', 
                      label: 'Tiêu đề',
                      width: '460px',
                      render: (value, row) => (
                        <div className="title-cell">
                          <div className="title-text">{truncateText(value, 60)}</div>
                          <div className="news-meta">
                            {row.is_hot && (
                              <span className="hot-badge">
                                <FaFire /> Nổi bật
                              </span>
                            )}
                            <span className="views-count">{row.views} lượt xem</span>
                          </div>
                        </div>
                      )
                    },
                    { key: 'category_name', label: 'Danh mục', width: '120px' },
                    { 
                      key: 'created_at', 
                      label: 'Ngày đăng',
                      width: '150px',
                      render: (value) => formatDate(value)
                    },
                    {
                      key: 'actions',
                      label: 'Thao tác',
                      width: '120px',
                      render: (value, row) => (
                        <div className="action-buttons">
                          <Link 
                            to={`/dashboard/author/news/${row.id}`}
                            className="btn-icon edit"
                            title="Sửa tin"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteNews(row.id)}
                            className="btn-icon delete"
                            title="Xóa tin"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )
                    }
                  ]}
                  emptyMessage={
                    <div className="empty-state">
                      <FaNewspaper size={48} />
                      <p>Bạn chưa có tin tức nào</p>
                      <Link to="/author/news/create" className="btn btn-primary">
                        <FaPlus />
                        Tạo Tin Đầu Tiên
                      </Link>
                    </div>
                  }
                />
                {/* Phân trang */}
                <div className="pagination-container">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showPageNumbers={true}
                    showNavigation={true}
                  />
                </div>
              </div>
            )}

            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="profile-card">
                  <div className="profile-header">
                    <FaUserEdit size={24} />
                    <h3>Xem Hồ sơ Tác giả</h3>
                  </div>
                  <div className="profile-content">
                    <p>Quản lý thông tin cá nhân và hồ sơ tác giả của bạn.</p>
                    <div className="profile-info">
                      <div className="info-item">
                        <strong>Tên đăng nhập:</strong> {user?.username}
                      </div>
                      <div className="info-item">
                        <strong>Email:</strong> {user?.email}
                      </div>
                      <div className="info-item">
                        <strong>Vai trò:</strong> {user?.role === 'author' ? 'Tác giả' : user?.role}
                      </div>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <Link to="/" className="btn btn-primary">
                      <FaHome />
                      Quay lại trang chủ
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorDashboard;