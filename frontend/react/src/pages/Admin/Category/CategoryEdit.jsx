import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dashboardService } from '../../../services/dashboardService';
import { categoryService } from '../../../services/categoryService';
import { useToast } from '../../../hooks/useToast';
import Loading from '../../../components/ui/Loading/Loading';
import './CategoryForm.scss';


const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    loadCategoryData();
  }, [id]);

  const loadCategoryData = async () => {
    try {
      const categoryRes = await categoryService.getCategoryById(id);
      const category = categoryRes.data || categoryRes;
      setFormData({
        name: category.name || ''
      });
    } catch (err) {
      showError('Không thể tải dữ liệu danh mục');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      name: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const result = await dashboardService.updateCategory(id, formData);
      if (result.success) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      showError('Lỗi khi cập nhật danh mục');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading text="Đang tải dữ liệu..." />;

  return (
    <div className="category-form">
      <div className="form-header">
        <h1>Sửa Danh Mục</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Tên danh mục *</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
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

export default CategoryEdit;