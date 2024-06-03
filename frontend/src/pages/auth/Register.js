import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegisterApi } from '../../services/userService';
import './Form.css'; // Import your CSS file for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [errFirstname, setErrFirstname] = useState('');
    const [errLastname, setErrLastname] = useState('');
    const [errEmail, setErrEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.trim() === '') {
            setErrUsername('Username is required');
            return;
        }

        if (firstname.trim() === '') {
            setErrFirstname('First name is required');
            return;
        }

        if (lastname.trim() === '') {
            setErrLastname('Last name is required');
            return;
        }

        if (password.trim().length < 8) {
            setErrPassword('Password must be at least 8 characters long');
            return;
        }

        if (password.trim() === '') {
            setErrPassword('Password is required');
            return;
        }

        if (password !== confirmPassword) {
            setErrPassword('Passwords do not match');
            return;
        }

        if (email.trim() === '') {
            setErrEmail('Email is required');
            return;
        }

        const userData = {
            username,
            firstname,
            lastname,
            password,
            email,
        };

        try {
            const response = await handleRegisterApi(userData);
            console.log('Registration successful:', response.data);
            
            setUsername('');
            setFirstname('');
            setLastname('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            setErrUsername('');
            setErrPassword('');
            setErrFirstname('');
            setErrLastname('');
            setErrEmail('');
            
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleOnChangeInput = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
            setErrUsername('');
        } else if (name === 'password') {
            setPassword(value);
            setErrPassword('');
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
            setErrPassword('');
        } else if (name === 'firstname') {
            setFirstname(value);
            setErrFirstname('');
        } else if (name === 'lastname') {
            setLastname(value);
            setErrLastname('');
        } else if (name === 'email') {
            setEmail(value);
            setErrEmail('');
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-6 col-xl-5">
                        <div className="card bg-dark back-ground" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 ">
                                <div className="mb-md-5 mt-md-1">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center text-white">Register</h2>
                                    <p className="text-white-50 mb-5 text-center">Please enter your details to register!</p>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input 
                                                type="text" 
                                                id="typeUsername" 
                                                name="username" 
                                                placeholder="Username" 
                                                className="form-control form-control-lg input"
                                                value={username} 
                                                onChange={handleOnChangeInput}
                                            />
                                            <label htmlFor="typeUsername">Username</label>
                                            <div className="error-message">
                                                {errUsername}
                                            </div>
                                        </div>

                                        <div className="row position-relative">
                                            <div className='col-md-6 mb-3'>
                                                <div className="form-floating">
                                                    <input 
                                                        type="text" 
                                                        id="typeFirstname" 
                                                        name="firstname" 
                                                        placeholder="First name" 
                                                        className="form-control form-control-lg input"
                                                        value={firstname} 
                                                        onChange={handleOnChangeInput} 
                                                    />
                                                    <label htmlFor="typeFirstname">First name</label>
                                                    <div className="error-message">
                                                        {errFirstname}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-6 mb-3'>
                                                <div className='form-floating'>
                                                    <input 
                                                        type="text" 
                                                        id="typeLastname" 
                                                        name="lastname" 
                                                        placeholder="Last name" 
                                                        className="form-control form-control-lg input"
                                                        value={lastname} 
                                                        onChange={handleOnChangeInput} 
                                                    />
                                                    <label htmlFor="typeLastname">Last name</label>
                                                    <div className="error-message">
                                                        {errLastname}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input 
                                                type="password"
                                                id="typePassword" 
                                                name="password"
                                                placeholder="Password"
                                                value={password} 
                                                className="form-control form-control-lg input"
                                                onChange={handleOnChangeInput} 
                                            />
                                            <label htmlFor="typePpassword">Password</label>
                                            <div className="error-message">
                                                {errPassword}
                                            </div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input 
                                                type="password" 
                                                id="confirmPassword" 
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                                value={confirmPassword} 
                                                className="form-control form-control-lg input"
                                                onChange={handleOnChangeInput} 
                                            />
                                            <label htmlFor="confirmPassword">Confirm password</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input 
                                                type="email" 
                                                id="typeEmail"
                                                name="email"
                                                placeholder="Email" 
                                                value={email} 
                                                onChange={handleOnChangeInput} 
                                                className="form-control form-control-lg input"
                                            />
                                            <label htmlFor="typeEmail">Email</label>
                                            <div className="error-message">
                                                {errEmail}
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-outline-light btn-lg px-5 text-center" type="submit">Register</button>
                                        </div>                                       
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
