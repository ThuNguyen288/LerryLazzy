import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            console.error('Username or password is empty');
            return;
        }
        try {
            const response = await axios.post('/users', {
                username,
                password
            });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            
        }
    };
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-link me-3">Forgot Password?</button>
                            <span className="text-muted">|</span>
                            <button className="btn btn-link ms-3">Create New Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
