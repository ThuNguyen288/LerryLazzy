import React, { Component } from 'react';
import { handleLoginApi } from '../services/userService';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: '',
            isValid: true,
            isValidP: true,
            errUsername: '',
            errPassword: ''
        };
    }

    handleLogin = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        if (username.trim() === '') {
            this.setState({
                isValid: false,
                errUsername: 'Username is required'
            });
            return;
        }
        if (username.trim() !== '' && password.trim() === '') {
            this.setState({
                isValidP: false,
                errPassword: 'Password is required'
            });
            return;
        }
        try {
            let data = await handleLoginApi(username, password);
            if (data && data.errCode === 1) {
                this.setState({
                isValid: false,
                errUsername: data.message
                });
            } else if (data && data.errCode === 3) {
                this.setState({
                    isValidP: false,
                    errPassword: data.message
                    });
            } else {
                // this.props.userLoginSuccess(data.user);
                console.log("Login succeed!")
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    });
                }
            }
        console.log(error.response);
        }
    };

    handleOnChangeInput = (event) => {
        const { name, value } = event.target;
        console.log(value);
        this.setState({
            [name]: value,
            isValid: true,
            isValidP: true,
            errUsername: '',
            errPassword: ''
        });
    }

    handleShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    }

    render() {
        const { username, password, showPassword } = this.state;

        return (
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark back-gound" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 ">
                                    <div className="mb-md-5 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase text-center text-white">Login</h2>
                                        <p className="text-white-50 mb-5 text-center">Please enter your account and password!</p>

                                        <form onSubmit={this.handleLogin}>
                                            <div className="form-floating mb-4">
                                                <input 
                                                type="text" 
                                                id="typeUsername" 
                                                name="username" 
                                                placeholder="Username" 
                                                className={"form-control form-control-lg" + (!this.state.isValid ? 'is-invalid' : '')}
                                                value={username} 
                                                onChange={this.handleOnChangeInput}
                                                />
                                                <label for="typeUsername">Username</label>
                                                <div className="error-message">
                                                    {this.state.errUsername}
                                                </div>
                                            </div>

                                            <div className="form-floating mb-4 position-relative">
                                                <input 
                                                type={this.state.showPassword ? "text" : "password"} 
                                                id="typePassword" 
                                                name="password" 
                                                placeholder="Password" 
                                                className="form-control form-control-lg" 
                                                style={{borderColor: (this.state.isValidP ? '' : 'red')}}
                                                value={password} 
                                                onChange={this.handleOnChangeInput}
                                                />
                                                <label for="typePassword">Password</label>
                                                <i
                                                className={"fa " + (showPassword ? "fa-eye" : "fa-eye-slash") + " position-absolute"}
                                                style={{ top: '23px', right: '10px', cursor: 'pointer', opacity: '0.7'}}
                                                onClick={this.handleShowPassword}
                                                ></i>
                                                <div className="error-message">
                                                    {this.state.errPassword}
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end mb-4">
                                                <a className="small mb-2 pb-lg-2 text-white-50 forgot" href="#!">Forgot password?</a>
                                            </div>
                                            
                                            
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn btn-outline-light btn-lg px-5 text-center" type="submit">Login</button>
                                            </div>
                                        </form>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-0 text-center text-white">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         lang: state.app.language
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
//     };
// };

export default (LoginPage);
