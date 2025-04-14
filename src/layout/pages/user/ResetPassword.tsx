import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface formData {
    newPassword: string;
    confirmPassword: string;
}

const ResetPassword = () => {

    const { email, forgotPasswordCode } = useParams();

    const [formData, setFormData] = useState<formData>({
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const url = `http://localhost:8080/api/account/resetPassword`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email : email,
                    forgotPasswordCode:forgotPasswordCode,
                    newPassword:formData.newPassword
                }),
            });
            if(response.ok){
                toast.success("Tạo lại mật khẩu thành công");
            }else{
                toast.error("Tạo lại mật khẩu thất bại, không thể xử lý yêu cầu lúc này!");
            }
        } catch (error) {
            toast.error("Mật khẩu không hợp lệ!");
        }   
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Đặt lại mật khẩu</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Tạo mật khẩu mới cho tài khoản của bạn
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            Mật khẩu mới
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu mới"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu mới
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu mới"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                        Đặt lại mật khẩu
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

export default ResetPassword;
