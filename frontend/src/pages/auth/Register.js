import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrMessage('Passwords do not match');
            return;
        }

        try {
            
            
        } catch (error) {
            console.log(error);
            setErrMessage('An error occurred during registration, please try again later.');
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark back-ground" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5">
                                <div className="mb-md-5 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center text-white">Register</h2>
                                    <p className="text-white-50 mb-5 text-center">Please fill in the form to create an account!</p>

                                    <form onSubmit={handleRegister}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        id="typeFirstname"
                                                        name="firstname"
                                                        placeholder="First Name"
                                                        className="form-control form-control-lg"
                                                        value={firstname}
                                                        onChange={(e) => setFirstname(e.target.value)}
                                                    />
                                                    <label htmlFor="typeFirstname">First Name</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        id="typeLastname"
                                                        name="lastname"
                                                        placeholder="Last Name"
                                                        className="form-control form-control-lg"
                                                        value={lastname}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                    />
                                                    <label htmlFor="typeLastname">Last Name</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input
                                                type="text"
                                                id="typeUsername"
                                                name="username"
                                                placeholder="Username"
                                                className="form-control form-control-lg"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <label htmlFor="typeUsername">Username</label>
                                        </div>

                                        <div className="form-floating mb-4 position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="typePassword"
                                                name="password"
                                                placeholder="Password"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label htmlFor="typePassword">Password</label>
                                            <i
                                                className={"fa " + (showPassword ? "fa-eye" : "fa-eye-slash") + " position-absolute"}
                                                style={{ top: '23px', right: '10px', cursor: 'pointer', opacity: '0.7' }}
                                                onClick={handleShowPassword}
                                            ></i>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input
                                                type="password"
                                                id="typeConfirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                className="form-control form-control-lg"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <label htmlFor="typeConfirmPassword">Confirm Password</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input
                                                type="text"
                                                id="typePhone"
                                                name="phone"
                                                placeholder="Phone"
                                                className="form-control form-control-lg"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <label htmlFor="typePhone">Phone</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input
                                                type="email"
                                                id="typeEmail"
                                                name="email"
                                                placeholder="Email"
                                                className="form-control form-control-lg"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="typeEmail">Email</label>
                                        </div>

                                        {errMessage && (
                                            <div className="alert alert-danger" role="alert">
                                                {errMessage}
                                            </div>
                                        )}

                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-outline-light btn-lg px-5 text-center" type="submit">Register</button>
                                        </div>
                                    </form>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-0 text-center text-white">Already have an account? <a href="/login" className="text-white-50 fw-bold">Login</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterPage;
