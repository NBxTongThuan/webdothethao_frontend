import React from 'react';

const Register: React.FC = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 rounded">
                        <h2 className="text-center mb-4">Register</h2>
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter username" required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" className="form-control" id="phone" placeholder="Enter phone number" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="repassword">Re-enter Password</label>
                                <input type="password" className="form-control" id="repassword" placeholder="Re-enter Password" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;