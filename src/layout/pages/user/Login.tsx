import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('username:', username);
        console.log('Password:', password);
    };
    const containerStyle = {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '400px',
        margin: '0 auto'
    };
    return (
        <div className="container mt-5 mb-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
            <div className='row container mt-3 mb-4 justify-content-end'>
                <div className='row col-6'> 
                    <div className='col-6'>
                        <a href='/register'>Register</a>
                    </div>
                    <div className='col-6'>
                        <a href='/forgot-password'>Forgot password</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;