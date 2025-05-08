import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../util/AuthContext";
interface formData {
    username: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const ChangePassword = () => {
    const {user,logout} = useAuth();

    const navigate = useNavigate();
    const [errorRePassword, setErrorRePassword] = useState('');

    const [formData, setFormData] = useState<formData>({
        username: user?.userName + "",
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.newPassword != formData.confirmPassword) {
            toast.error("Mật khẩu không khớp");
            return;
        }
        if (!passwordRegex.test(formData.newPassword)) {
            setErrorRePassword("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt");
            return;
        }
        console.log(formData);
        const url = `http://localhost:8080/api/account/change-password`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: formData.username,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            }),
        });
        if (response.ok) {
            toast.success("Đổi mật khẩu thành công");
            
            setTimeout(() => {
                logout();
            }, 3000);
        } else {
            toast.error("Đổi mật khẩu thất bại");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Đổi mật khẩu</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Bảo vệ tài khoản của bạn với mật khẩu mới
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Tên đăng nhập
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-user text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                            Mật khẩu cũ
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

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
                                required
                            />
                        </div>
                        {errorRePassword && <p className="text-red-500 text-sm">{errorRePassword}</p>}
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
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                        Đổi mật khẩu
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

export default ChangePassword;
