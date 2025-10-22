import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../../../services/dashboardService";
import { categoryService } from "../../../services/categoryService";
import { useToast } from "../../../hooks/useToast";
import Loading from "../../../components/ui/Loading/Loading";
import './CategoryForm.scss';

const CategoryCreate = () => { 
    const navigate = useNavigate();
    const { showSuccess, showError} = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name : ''
    })

    const handleChange = (e) => { 
        setFormData({
            name: e.target.value
        })
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(!formData.name.trim()) {
            showError("Vui lòng nhập tên danh mục")
            return;
        }
        setLoading(true);
        try {
            const response = await dashboardService.createCategory(formData);
            if(response.success) {
                navigate('/admin/dashboard');
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="category-form">
            <div className="form-header">
                <h1>Tạo danh mục</h1>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="btn btn-secondary"
                >
                    Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label>Tên danh mục</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nhập tên danh mục..."
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Đang tạo...' : 'Tạo danh mục'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CategoryCreate;