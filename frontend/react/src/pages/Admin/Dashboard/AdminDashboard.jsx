import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaNewspaper,
  FaUsers,
  FaEye,
  FaUserTie,
  FaFolder,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFire,
  FaChartBar
} from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { dashboardService } from '../../../services/dashboardService';
import Loading from '../../../components/ui/Loading/Loading';
import DataTable from '../../../components/ui/DataTable/DataTable';
import Pagination from '../../../components/ui/Pagination/Pagination';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState('news');
  const [stats, setStats] = useState({});
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  // phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadDashboardData();
    setCurrentPage(1);
    loadTableData(activeTab);
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      const statsRes = await dashboardService.getAdminStats();
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
      showError('Không thể tải thống kê dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadTableData = async (tab) => {
    try {
      setTableLoading(true);
      switch (tab) {
        case 'news':
          const newsRes = await dashboardService.getAdminNews();
          if (newsRes.success) setNews(newsRes.data);
          break;
        case 'users':
          const usersRes = await dashboardService.getAdminUsers();
          if (usersRes.success) setUsers(usersRes.data);
          break;
        case 'authors':
          const authorsRes = await dashboardService.getAdminAuthors();
          if (authorsRes.success) setAuthors(authorsRes.data);
          break;
        case 'categories':
          const categoriesRes = await dashboardService.getAdminCategories();
          if (categoriesRes.success) setCategories(categoriesRes.data);
          break;
        default:
          break;
      }
    } catch (err) {
      showError(`Không thể tải dữ liệu ${tab}`);
    } finally {
      setTableLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;

    try {
      let result;
      switch (type) {
        case 'news':
          result = await dashboardService.deleteNews(id);
          setNews(news.filter(item => item.id !== id));
          break;
        case 'user':
          result = await dashboardService.deleteUser(id);
          setUsers(users.filter(item => item.id !== id));
          break;
        case 'author':
          result = await dashboardService.deleteAuthor(id);
          setAuthors(authors.filter(item => item.id !== id));
          break;
        case 'category':
          result = await dashboardService.deleteCategory(id);
          setCategories(categories.filter(item => item.id !== id));
          break;
        default:
          break;
      }

      if (result?.success) {
        showSuccess('Xóa thành công');
      }
    } catch (err) {
      showError('Lỗi khi xóa');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // Lấy dữ liệu cho trang hiện tại 
  const getCurrentData = () => {
    let data = [];
    switch (activeTab) {
      case 'news':
        data = news;
        break;
      case 'users':
        data = users;
        break;
      case 'authors':
        data = authors;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        break;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  const getTotalPages = () => {
    let data = [];
    switch (activeTab) {
      case 'news':
        data = news;
        break;
      case 'users':
        data = users;
        break;
      case 'authors':
        data = authors;
        break;
      case 'categories':
        data = categories;
        break;
      default:
        break;
    }
    return Math.ceil(data.length / itemsPerPage);
  }
  // tính tổng số trang 
  if (loading) {
    return <Loading size="large" text="Đang tải dashboard..." />;
  }

  const currentData = getCurrentData();
  const totalPages = getTotalPages();


  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Chào mừng trở lại, <strong>{user?.username}</strong>!</p>
        </div>
        <div className="header-actions">
          <Link to="/admin/news/create" className="btn btn-primary">
            <FaPlus />
            Thêm Tin Mới
          </Link>
          <Link to="/admin/categories/create" className="btn btn-primary">
            <FaPlus />
            Thêm Danh Mục
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
            <div className="stat-label">Tổng Tin Tức</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsers || 0}</div>
            <div className="stat-label">Người Dùng</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">
            <FaUserTie />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalAuthors || 0}</div>
            <div className="stat-label">Tác Giả</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">
            <FaFolder />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalCategories || 0}</div>
            <div className="stat-label">Danh Mục</div>
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon">
            <FaEye />
          </div>
          <div className="stat-content">
            <div className="stat-value">{(stats.totalViews || 0).toLocaleString()}</div>
            <div className="stat-label">Lượt Xem</div>
          </div>
        </div>

        <div className="stat-card hot">
          <div className="stat-icon">
            <FaFire />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.hotNewsCount || 0}</div>
            <div className="stat-label">Tin Nổi Bật</div>
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
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> Quản lý Người dùng
        </button>
        <button
          className={`tab-btn ${activeTab === 'authors' ? 'active' : ''}`}
          onClick={() => setActiveTab('authors')}
        >
          <FaUserTie /> Quản lý Tác giả
        </button>
        <button
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <FaFolder /> Quản lý Danh mục
        </button>
      </div>

      {/* Table Content */}
      <div className="table-container">
        {tableLoading ? (
          <Loading text={`Đang tải dữ liệu...`} />
        ) : (
          <>
            {/* News Table */}
            {activeTab === 'news' && (
              <>
                <DataTable
                  title="Danh sách Tin tức"
                  data={currentData}
                  columns={[
                    { key: 'id', label: 'ID', width: '80px' },
                    {
                      key: 'title',
                      label: 'Tiêu đề',
                      render: (value, row) => (
                        <div>
                          <div className="title-text">{truncateText(value, 60)}</div>
                          {row.is_hot && (
                            <span className="hot-badge">
                              <FaFire /> Nổi bật
                            </span>
                          )}
                        </div>
                      )
                    },
                    { key: 'category_name', label: 'Danh mục' },
                    { key: 'author_name', label: 'Tác giả' },
                    { key: 'views', label: 'Lượt xem', width: '100px' },
                    {
                      key: 'created_at',
                      label: 'Ngày tạo',
                      render: (value) => formatDate(value)
                    },
                    {
                      key: 'actions',
                      label: 'Thao tác',
                      width: '120px',
                      render: (value, row) => (
                        <div className="action-buttons">
                          <Link
                            to={`/dashboard/admin/news/${row.id}`}
                            className="btn-icon edit"
                            title="Sửa"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete('news', row.id)}
                            className="btn-icon delete"
                            title="Xóa"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )
                    }
                  ]}
                  emptyMessage="Chưa có tin tức nào"
                />
                {/* phân trang */}
                {totalPages >= 1 && (
                  <div className="pagination-container">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      showPageNumbers={true}
                      showNavigation={true}
                    />
                  </div>
                )}
              </>
            )}

            {/* Users Table */}
            {activeTab === 'users' && (
              <>
                <DataTable
                  title="Danh sách Người dùng"
                  data={currentData}
                  columns={[
                    { key: 'id', label: 'ID', width: '80px' },
                    { key: 'username', label: 'Tên đăng nhập' },
                    { key: 'email', label: 'Email' },
                    {
                      key: 'role',
                      label: 'Vai trò',
                      render: (value) => (
                        <span className={`role-badge ${value}`}>
                          {value === 'admin' ? 'Quản trị' :
                            value === 'author' ? 'Tác giả' : 'Người dùng'}
                        </span>
                      )
                    },
                    {
                      key: 'created_at',
                      label: 'Ngày tạo',
                      render: (value) => formatDate(value)
                    },
                    {
                      key: 'actions',
                      label: 'Thao tác',
                      width: '120px',
                      render: (value, row) => (
                        <div className="action-buttons">
                          <Link
                            to={`/dashboard/admin/users/${row.id}`}
                            className="btn-icon edit"
                            title="Sửa"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete('user', row.id)}
                            className="btn-icon delete"
                            title="Xóa"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )
                    }
                  ]}
                  emptyMessage="Chưa có người dùng nào"
                />
                {/* phân trang */}
                {totalPages >= 1 && (
                  <div className="pagination-container">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}

            {/* Authors Table */}
            {activeTab === 'authors' && (
              <>
                <DataTable
                  title="Danh sách Tác giả"
                  data={currentData}
                  columns={[
                    { key: 'id', label: 'ID', width: '80px' },
                    { key: 'name', label: 'Tên tác giả' },
                    { key: 'bio', label: 'Biography' },
                    { key: 'user_id', label: 'ID người dùng' },
                    {
                      key: 'actions',
                      label: 'Thao tác',
                      width: '120px',
                      render: (value, row) => (
                        <div className="action-buttons">
                          <Link
                            to={`/dashboard/admin/authors/${row.id}`}
                            className="btn-icon edit"
                            title="Sửa"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete('author', row.id)}
                            className="btn-icon delete"
                            title="Xóa"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )
                    }
                  ]}
                  emptyMessage="Chưa có tác giả nào"
                />
                {/* phân trang */}
                {totalPages >= 1 && (
                  <div className="pagination-container">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}

            {/* Categories Table */}
            {activeTab === 'categories' && (
              <>
                <DataTable
                  title="Danh sách Danh mục"
                  data={currentData}
                  columns={[
                    { key: 'id', label: 'ID', width: '80px' },
                    { key: 'name', label: 'Tên danh mục' },
                    {
                      key: 'created_at',
                      label: 'Ngày tạo',
                      render: (value) => formatDate(value)
                    },
                    {
                      key: 'actions',
                      label: 'Thao tác',
                      width: '120px',
                      render: (value, row) => (
                        <div className="action-buttons">
                          <Link
                            to={`/dashboard/admin/categories/${row.id}`}
                            className="btn-icon edit"
                            title="Sửa"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete('category', row.id)}
                            className="btn-icon delete"
                            title="Xóa"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )
                    }
                  ]}
                  emptyMessage="Chưa có danh mục nào"
                />
                {/* phân trang */}
                {totalPages >= 1 && (
                  <div className="pagination-container">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;