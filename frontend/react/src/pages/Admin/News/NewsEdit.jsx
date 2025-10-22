import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardService } from '../../../services/dashboardService';
import { categoryService } from '../../../services/categoryService';
import { newsService } from '../../../services/newsService';
import { useToast } from '../../../hooks/useToast';
import Loading from '../../../components/ui/Loading/Loading';
import './NewsForm.scss';

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    author_id: '',
    is_hot: false,
    image_url: ''
  });

  useEffect(() => {
    loadNewsData();
  }, [id]);

  const loadNewsData = async () => {
    try {
      const [newsRes, categoriesRes] = await Promise.all([
        newsService.getNewsById(id),
        categoryService.getAllCategories()
      ]);
      
      const news = newsRes.data || newsRes;
      setFormData({
        title: news.title || '',
        content: news.content || '',
        category_id: news.category_id || '',
        author_id: news.author_id || '',
        is_hot: news.is_hot || false,
        image_url: news.image_url || ''
      });
      
      setCategories(categoriesRes.data || categoriesRes);
    } catch (err) {
      showError('Không thể tải dữ liệu tin tức');
      navigate('/dashboard/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await dashboardService.updateNews(id, formData);
      if (response.success) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      showError('Lỗi khi cập nhật tin tức');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading text="Đang tải dữ liệu..." />;

  return (
    <div className="news-form">
      <div className="form-header">
        <h1>Sửa Tin Tức</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Tiêu đề *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nội dung *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Danh mục *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>ID Tác giả *</label>
            <input
              type="number"
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>URL hình ảnh</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_hot"
                checked={formData.is_hot}
                onChange={handleChange}
              />
              Tin nổi bật
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Đang lưu...' : 'Cập nhật'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsEdit;