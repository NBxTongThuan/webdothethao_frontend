import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register: React.FC = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [errorUserName, setErrorUserName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRePassword, setErrorRePassword] = useState('');


    //HANDLE SUBMIT
    const handleSubmit = async (e: React.FormEvent) => {
        setErrorUserName('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorRePassword('');

        e.preventDefault();

        const isUserNameValid = !await checkUserNameExist(userName);
        const isEmailValid = !await checkEmailExist(email);
        const isPasswordValid = !checkPassword(password);
        const isRePasswordValid = !checkRePassword(rePassword);

        if(isUserNameValid && isEmailValid && isPasswordValid && isRePasswordValid){
            const url = 'http://localhost:8080/api/account/Register';
            const data = {
                userName: userName,
                email: email,
                password: password
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

               

                console.log(response.ok);

                if (response.ok) {
                    toast.success("Đăng ký thành công, vui lòng kiểm tra email của bạn để kích hoạt tài khoản");
                } else {
                    toast.error("Đăng ký thất bại");
                }
            } catch (err) {
                toast.error("Lỗi: " + err);
            }
        }
    }


    //HANDLE SUBMIT


    //HANDLE USERNAME
    const checkUserNameExist = async (userName: string) => {
        const url = `http://localhost:8080/api/users/checkExistsByUserName?userName=${userName}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data) {
                setErrorUserName('Tên đăng nhập đã tồn tại');
                return true;
            }
            return false;
        } catch (err) {
            alert('Lỗi: ' + err);
            return false;
        }
    }
    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);

        setErrorUserName('');

        checkUserNameExist(e.target.value);

    }
    //HANDLE USERNAME

    //HANDLE EMAIL

    const checkEmailExist = async (email: string) => {
        const url = `http://localhost:8080/api/users/checkExistsByEmail?email=${email}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (data) {
                setErrorEmail('Email đã tồn tại');
                return true;
            }
            return false;
        } catch (err) {
            alert('Lỗi: ' + err);
            return false;
        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        setErrorEmail('');

        checkEmailExist(e.target.value);
    }
    //HANDLE EMAIL

    ///////////////////////////////////////////////////////////////////////////////
    //HANDLE PASSWORD

    const checkPassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!password.match(passwordRegex)) {
            setErrorPassword('Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt');
            return true;
        }
        setErrorPassword('');
        return false;
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);

        setErrorPassword('');

        checkPassword(e.target.value);
    }
    //HANDLE PASSWORD

    //HANDLE REPASSWORD
    const checkRePassword = (rePassword: string) => {
        if (rePassword !== password) {
            setErrorRePassword('Mật khẩu không khớp');
            return true;
        }
        setErrorRePassword('');
        return false;
    }
    const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRePassword(e.target.value);

        setErrorRePassword('');

        checkRePassword(e.target.value);
    }
    //HANDLE REPASSWORD


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Logo và tiêu đề */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Đăng ký tài khoản</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Tham gia cùng YouSport để nhận nhiều ưu đãi hấp dẫn
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
                                placeholder="Nhập tên đăng nhập"
                                value={userName}
                                onChange={handleUserNameChange}
                                required
                            />
                        </div>
                        {errorUserName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {errorUserName}
                            </p>
                        )}
                    </div>

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
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                placeholder="Nhập địa chỉ email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        {errorEmail && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {errorEmail}
                            </p>
                        )}
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
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        {errorPassword && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {errorPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="repassword" className="block text-sm font-medium text-gray-700">
                            Xác nhận mật khẩu
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                            <input
                                type="password"
                                id="repassword"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                                placeholder="Nhập lại mật khẩu"
                                value={rePassword}
                                onChange={handleRePasswordChange}
                                required
                            />
                        </div>
                        {errorRePassword && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {errorRePassword}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            Tôi đồng ý với <a href="#" className="text-red-500 hover:text-red-600">điều khoản</a> và <a href="#" className="text-red-500 hover:text-red-600">chính sách bảo mật</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                        Đăng ký tài khoản
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to="/Login" className="font-medium text-red-500 hover:text-red-600 transition-colors duration-200">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;