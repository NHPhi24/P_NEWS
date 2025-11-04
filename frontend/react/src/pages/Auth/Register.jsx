import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import Loading from "../../components/ui/Loading/Loading";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import './Auth.scss';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => { 
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const {register, error, clearError, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    
    // Redirect if already authenticated
    useEffect(() => { 
        if(isAuthenticated) { 
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // clear error when component unmounts
    useEffect(() => { 
        return () => clearError();
    }, [clearError]);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    // clear field error when user starts typing
    if(formErrors[name]){
        setFormData(prev => ({
            ...prev,
            [name]: ''
        }))
    }

    // clear global error and success message
    if(error) {
        clearError();
    }
    if(successMessage) {
        setSuccessMessage('');
    }


    const validateForm = () => { 
        const errors = {}
        if(!formData.username.trim()) {
            errors.username = "Tên người dùng là bắt buộc"
        } else if(formData.username.length <3 ){
            errors.username = "Tên quá ngắn. Tên phải có ít nhất 3 ký tự"
        }

        if(!formData.email.trim()){ 
            errors.email = "Email là bắt buộc"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            erros.email = "Email không hợp lệ"
        }
        

        if(!formData.password.trim()){
            errors.password = "Mật khẩu là bắt buộc"
        } else if(formData.password.length < 6){
            errors.password = "Mật khẩu phải có ít nhất 6 ký tự"
        }

        if(!formData.confirmPassword.trim()){
            errors.confirmPassword = "Xác nhận mật khâu là bắt buộc"
        } else if(formData.confirmPassword !== formData.password){
            errors.confirmPassword = "Mật khâu xác nhận không trùng khớp"
        }
        return errors;
    }
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const errors = validateForm();
        if(Object.keys(errors).length > 0){
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        const result = await register({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });

        if(result.success) {
            toast.success(result.message|| 'Đăng ký thành công! Vui lòng đăng nhập', {
                position: "top-right",
            });
            setSuccessMessage(result.message|| 'Đăng ký thành công! Vui lòng đăng nhập');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            // redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            setIsSubmitting(false); 
        } else {
            toast.error(result.message || 'Đăng ký thất bại. Vui lý thử lại', {
                position: "top-right"
            });
        }
    };

    const togglePasswordVisibility = () => { 
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => { 
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1 className="auth-title">Đăng ký</h1>
                        <p className="auth-subtitle">Tạo tài khoản mới trên P_NEWS</p>
                    </div>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <Input
                            label="Tên người dùng"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Nhập tên người dùng"
                            error={formErrors.username}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            error={formErrors.email}
                            required
                        />

                        <div className="input-group">
                            <Input
                                label="Mật khẩu"
                                type={showPassword ? 'text': 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khâu"
                                error={formErrors.password}
                                required
                            />
                            
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="input-group">
                            <Input
                                label="Xác nhận mật khâu"
                                type={showConfirmPassword ? 'text': 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập xác nhận mật khâu"
                                error={formErrors.confirmPassword}
                                required
                            />
                            
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="auth-success">
                                {successMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            disabled={isSubmitting}
                            className="auth-button"
                        >
                            {isSubmitting ? <Loading size="small" text=""/> : 'Đăng ký'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Đã có tài khoản?{''}
                            <Link to="/login" className="auth-link">
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;