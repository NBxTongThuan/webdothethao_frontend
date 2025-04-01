
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartID } from '../../../api/CartAPI';

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('username:', username);
        console.log('Password:', password);

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

                getCartID(username)
                .then((cartID) => {
                    localStorage.setItem('cartID', cartID);
                    console.log(cartID);
                })
                    .catch((error) => {
                        console.error('Error fetching cart ID:', error);
                    }
                    );
                navigate('/');
            } else {
                alert('Login failed');
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
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium">Username:</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/Register" className="text-blue-600 hover:underline">Register</Link>
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a>
        </div>
      </div>
      
    );
};

export default Login;