import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../../../services/dashboardService";
import { categoryService } from "../../../services/categoryService";
import { newsService } from "../../../services/newsService";
import { useToast } from "../../../hooks/useToast";
import Loading from "../../../components/ui/Loading/Loading";
import './NewsForm.scss';

const NewsCreate = () => { 
    const navigate = useNavigate();
    const {showError, showSuccess} = useToast();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: '',
        author_id: '',
        is_hot: false,
        image_url: '',
    });

    useEffect(() =>{ 
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const response = await categoryService.getAllCategories();
            showSuccess('Danh sách danh mục');
            setCategories(response.data);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => { 
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setLoading(true);
        try {
            const response = await newsService.createNews(formData);
            if(response.sussess) {
                navigate('/dashboard/admin');
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="news-form">
      <div className="form-header">
        <h1>Tạo Tin Tức Mới</h1>
        <button onClick={() => navigate('/dashboard/admin')} className="btn btn-secondary">
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
              placeholder="Nhập ID tác giả"
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
              placeholder="https://example.com/image.jpg"
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo Tin Tức'}
          </button>
        </div>
      </form>
    </div>
  );

}

export default NewsCreate