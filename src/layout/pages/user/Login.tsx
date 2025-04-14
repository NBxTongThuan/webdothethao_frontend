import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartID } from '../../../api/CartAPI';
import { getUserIsActive } from '../../../util/JwtService';
import { toast} from 'react-toastify';

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };


    const handleLogin = async () => {
        const url = 'http://localhost:8080/api/account/Login';
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
                body: JSON.stringify(data)
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.jwt);
                if (!getUserIsActive()) {
                    toast.error('Tài khoản của bạn chưa được kích hoạt');
                    localStorage.removeItem('token');
                }
                else {
                   
                    getCartID(username)
                        .then((cartID) => {
                            toast.success('Đăng nhập thành công');
                            localStorage.setItem('cartID', cartID);
                            window.dispatchEvent(new Event("storage"));
                            // setTimeout(() => {
                                navigate('/');
                            // }, 1500); đợi 1,5 giây
                        })
                        .catch((error) => {
                            console.error('Error fetching cart ID:', error);
                        }
                        );
                }
            } else {
                toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác');
            }
        } catch (error) {
            console.log(error);
        }
    }



    const containerStyle = {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '400px',
        margin: '0 auto'
    };
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
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
                        <a href="/forgot-password" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                        Đăng nhập
                        {/* <ToastContainer /> */}
                    </button>

                    <div className="relative my-6">
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
                    </div>
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