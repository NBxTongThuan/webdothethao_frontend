import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface formData {
    email: string;
}

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formData>({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            
            const url = `http://localhost:8080/api/account/forgot-password?email=${formData.email}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                toast.success("Email tạo lại mật khẩu đã được gửi đến email của bạn!");
                setTimeout(() => {
                    navigate("/Login");
                }, 3000);
            }else{
                toast.error("Email không tồn tại hoặc gặp lỗi trong quá trình xử lý!");
            }
            
        } catch (error) {
            toast.error("Email không tồn tại hoặc gặp lỗi trong quá trình xử lý!");
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Quên mật khẩu</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Địa chỉ Email
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-envelope text-gray-400"></i>
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ email"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                        Gửi liên kết đặt lại mật khẩu
                    </button>
                </form>

                <div className="mt-6 text-center space-y-4">
                    <p className="text-sm text-gray-600">
                        Bạn chưa có tài khoản?{' '}
                        <Link to="/Register" className="font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                            Đăng ký ngay
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600">
                        Đã có tài khoản?{' '}
                        <Link to="/Login" className="font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
