import React, { useState } from 'react';

const Register: React.FC = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [errorUserName, setErrorUserName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRePassword, setErrorRePassword] = useState('');
    const [annouce, setAnnouce] = useState('');


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
                    setAnnouce('Đăng ký thành công vui lòng kiểm tra email để kích hoạt tài khoản');
                } else {
                    setAnnouce('Đăng ký thất bại');
                }
            } catch (err) {
                alert('Lỗi: ' + err);
            }
        }else{
            setAnnouce('Đăng ký thất bại');
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
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">ĐĂNG KÝ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
            <div className="text-red-500 text-sm">{errorUserName}</div>
          </div>
          
          <div>
            <label htmlFor="email" className="block font-medium">Địa chỉ Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="text-red-500 text-sm">{errorEmail}</div>
          </div>
          
          <div>
            <label htmlFor="password" className="block font-medium">Mật khẩu</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="text-red-500 text-sm">{errorPassword}</div>
          </div>
          
          <div>
            <label htmlFor="repassword" className="block font-medium">Mật khẩu nhập lại</label>
            <input
              type="password"
              id="repassword"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Re-enter Password"
              value={rePassword}
              onChange={handleRePasswordChange}
              required
            />
            <div className="text-red-500 text-sm">{errorRePassword}</div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>
          
          <div className="text-green-600 text-sm">{annouce}</div>
        </form>
      </div>
      
    );
}

export default Register;