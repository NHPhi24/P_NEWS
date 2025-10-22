import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { newsService} from "../../../services/newsService";
import { categoryService } from "../../../services/categoryService";
import { useToast } from "../../../hooks/useToast";
import Loading from "../../../components/ui/Loading/Loading";
import './NewsForm.scss';

const NewsCreateAuthor = () => { 
    const navigate = useNavigate();
    const {user} = useAuth();
    const {showSuccess, showError} = useToast();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: '',
        image_url: ''
    });
    
    useEffect(() => { 
        loadCategories();
    }, []);
    
    const loadCategories = async () => {
        setLoading(true);
        try {
            const response = await categoryService.getAllCategories();
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // đảm bảo author_id luôn là ID của user hiện tại
            const submitData = {
                ...formData,
                author_id: user.id
            }

            const response = await newsService.createNews(submitData);
            if(response.success) {
                navigate('/author/dashboard');
            }
        } catch (err) {
            showError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if(loading) return <Loading text="Đang tải..."/>
    return (
        <div className="news-form">
            <div className="form-header">
                <h1>Tạo tin tức mới của tác giả {user?.name}</h1>
                <button onClick={() => navigate('/author/dashboard')} className="btn btn-secondary">
                    Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label>Tiêu đề</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="Nhập tiêu đề ... "                        
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nội dung</label>
                    <textarea 
                        type="text" 
                        name="content" 
                        value={formData.content}
                        onChange={handleChange} 
                        rows={10} 
                        placeholder="Nhập nội dung ..."                        
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Danh mục</label>
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
                        <label>Tác giả</label>
                        <input 
                            type="text"
                            value={user?.username || ''}
                            disabled
                            className="disabled-input"
                            placeholder="Tự động lấy từ tài khoản"
                        />
                        <small className="input-hint">Tác giả được tự động xác định từ tài khoản của bạn</small>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Hình ảnh URL</label>
                        <input 
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="http://..."
                        />
                        <small className="input-hint">để trống nếu không có ảnh</small>
                    </div>

                    <div className="author-note">
                        <div className="note-content">
                            <strong>Lưu ý cho tác giả: {user?.name}</strong>
                            <ul>
                                <li>Bạn không thể thực hiện tin nổi bật(hot)</li>
                                <li>chỉ có quản trị viên mới có thể thực hiện tin nổi bật</li>
                            </ul>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button 
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/author/dashboard')}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (<>
                            <div className="spiner">Đang tạo...</div>
                            </>): (
                                'Tạo tin mới'
                            )}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default NewsCreateAuthor