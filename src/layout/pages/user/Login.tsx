import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../util/AuthContext';
import { UserInfoResponse } from '../../../api/interface/Responses';
const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };


    const { setUser } = useAuth();

    const handleLoginSuccess = async () => {
        try {
            const url = 'http://localhost:8080/api/auth/me';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                const user: UserInfoResponse = {
                    userName: data.userName,
                    cartId: data.cartId || null,
                    role: data.role
                };
                setUser(user);
                navigate('/');
            } else {
                toast.error('Lỗi khi lấy thông tin tài khoản');
            }
        } catch (error) {
            toast.error('Lỗi khi lấy thông tin tài khoản');
        }
    }

    const handleLogin = async () => {
        const url = 'http://localhost:8080/api/auth/login';
        const data = {
            userName: username,
            passWord: password
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const { statusCode, message } = await response.json();
            if (statusCode === 'SUCCESS') {
                toast.success(message);
                handleLoginSuccess();
            } else {
                toast.error(message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-4">
                {/* Logo và tiêu đề */}

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Chào mừng bạn quay trở lại với YouSport
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
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Nhập tên đăng nhập"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <a href="/forgotPassword" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                        Đăng nhập
                    </button>

                    {/* <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <i className="fab fa-google text-red-500 mr-2"></i>
                            Google
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            <i className="fab fa-facebook text-blue-600 mr-2"></i>
                            Facebook
                        </button>
                    </div> */}
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Chưa có tài khoản?{' '}
                    <Link to="/Register" className="font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>

        </div>
    );
};

export default Login;