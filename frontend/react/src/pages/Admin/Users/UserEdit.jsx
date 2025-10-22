import React, { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../../services/userService";
import { dashboardService } from "../../../services/dashboardService";
import { useToast } from "../../../hooks/useToast";
import Loading from "../../../components/ui/Loading/Loading";
import './UserForm.scss';

const UserEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {showSuccess, showError} = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        avatar_url: ''
    });

    useEffect(() => { 
        loadUserData();
    },[])

    const loadUserData = async () => {
        try {
            const userRes = await userService.getUserById(id);
            const user = userRes.data || userRes;
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: user.password || '',
                avatar_url: user.avatar_url || ''
            })
        } catch (err) {
            showError("Không thể tải dữ liệu người dùng")
            navigate('/dashboard/admin')
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

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setSaving(true);
        try {
            const response = await dashboardService.updateUser(id, formData);
            if(response.sussess) {
                showSuccess("Cập nhật người dùng thành công");
                navigate('/admin/dashboard');
            }
        } catch (error) {
            showError("Lỗi khi cập nhật người dùng");
        } finally {
            setSaving(false);
        }
    }

    if(loading) return <Loading text="Đang tải dữ liệu..."/>;

    return (
        <div className="user-form">
            <div className="form-header">
                <h1>Cập nhật người dùng</h1>
                <button onClick={() => navigate('/admin/dashboard')} className="btn btn-secondary">
                    Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label>Tên người dùng</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Vai trò</label>
                    <select name="role" value={formData.role}
                    onChange={handleChange} required>
                        <option value="user">Người dùng</option>
                        <option value="author">Tác giả</option>
                        <option value="admin">Quản trị viện</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Hình ảnh URL</label>
                    <input 
                        type="text" 
                        name="avatar_url" 
                        value={formData.avatar_url}
                        onChange={handleChange}
                        placeholder="http://..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Đang lưu..." : "Cập nhật"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserEdit;