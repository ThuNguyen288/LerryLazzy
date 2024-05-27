import React, { Component } from 'react';
import { handleLoginApi } from '../services/userService';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errMessage: ''
        };
    }

    handleLogin = async (event) => {
        event.preventDefault();
        this.setState({
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                errMessage: data.message,
                });
            } else if (data && data.errCode === 0) {
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
            [name]: value
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
                    <div className="row d-flex justify-content-end align-items-center">
                        <div className="col-lg-6">
                            <p className="welcome-text">Welcome</p>
                            <p className="welcome-text">back!</p>
                        </div>
                        <div className="col-lg-5">
                            <div className="card bg-dark text-white form-login" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your account and password!</p>

                                        <form onSubmit={this.handleLogin}>
                                            <div className="form-outline form-white mb-4">
                                                <input 
                                                type="text" 
                                                id="typeUsername" 
                                                name="username" 
                                                placeholder="Username" 
                                                className="form-control form-control-lg" 
                                                value={username} 
                                                onChange={this.handleOnChangeInput}
                                                />
                                            </div>

                                            <div className="form-outline form-white mb-4 position-relative">
                                                <input 
                                                type={this.state.showPassword ? "text" : "password"} 
                                                id="typePassword" 
                                                name="password" 
                                                placeholder="Password" 
                                                className="form-control form-control-lg" 
                                                value={password} 
                                                onChange={this.handleOnChangeInput}
                                                />
                                                <i
                                                className={"fa " + (showPassword ? "fa-eye" : "fa-eye-slash") + " position-absolute"}
                                                style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', opacity: '0.7'}}
                                                onClick={this.handleShowPassword}
                                                ></i>
                                            </div>

                                            <div className="d-flex justify-content-between mb-4">
                                                <div className="remember-me">
                                                <input id="remember" type="checkbox"/>
                                                <label> Remember me</label>
                                                </div>
                                                <p className="small mb-2 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                            </div>
                                            
                                            <div className="form-outline mb-3 error-message">
                                                {this.state.errMessage}
                                            </div>
                                            
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                        </form>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fa fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fa fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fa fa-google fa-lg"></i></a>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
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
