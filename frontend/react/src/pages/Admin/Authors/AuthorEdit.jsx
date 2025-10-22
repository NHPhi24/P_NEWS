import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dashboardService } from "../../../services/dashboardService";
import { authorService } from "../../../services/authorService";
import { useToast } from "../../../hooks/useToast";
import Loading from "../../../components/ui/Loading/Loading";
import './AuthorForm.scss';

const AuthorEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {showSuccess, showError} = useToast();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        user_id: ''
    });

    useEffect(() => {
        loadAuthorData();
    }, []);

    const loadAuthorData = async() => {
        try {
           const authorRes = await authorService.getAuthorById(id);
           const author = authorRes.data || authorRes;
           setFormData({
               name: author.name || '',
               bio: author.bio || '',
               user_id: author.user_id || ''
           });
        } catch (err) {
            showError('Không thể tải dữ liệu người dùng');
            navigate('/dashboard/admin');
        }
        finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await dashboardService.updateAuthor(id, formData);
            if(response.success) {
                
                navigate('/admin/dashboard');
            }
        } catch (error) {
            showError('Lỗi khi cập nhật người dùng');
        } finally {
            setSaving(false);
        }
    }

    if(loading) return <Loading text="Đang tải dữ liệu..."/> 

    return (
        <div className="author-form">
            <div className="form-header">
                <h1>Cập nhật tác giả</h1>
                <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
                    Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label htmlFor="name">Tên tác giả</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Biography</label>
                    <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleChange} 
                    />
                </div>
                
                <div className="form-group">
                    <label>ID người dùng</label>
                    <input 
                        type="text" 
                        name="user_id" 
                        value={formData.user_id} 
                        onChange={handleChange} 
                        placeholder="ID người dùng..."
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Đang cập nhật...' : 'Cập nhật'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AuthorEdit