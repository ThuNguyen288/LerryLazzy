import React, { useState } from 'react';
import { handleChangePassword } from '../services/userService';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [currPassValid, setCurrPassValid] = useState(true)
    const [newPassValid, setNewPassValid] = useState(true)
    const [confPassValid, setConfPassValid] = useState(true)

    const [errCurrPass, setErrCurrPass] = useState('')
    const [errNewPass, setErrNewPass] = useState('')
    const [errConfPass, setErrConfPass] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'currentPassword') {
            setCurrentPassword(value)
            if (value.trim() !== '') {
                setCurrPassValid(true)
                setErrCurrPass('')
            }
        } else if (name === 'newPassword') {
            setNewPassword(value)
            if (value.trim() !== '') {
                setNewPassValid(true)
                setErrNewPass('')
            }
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value)
            if (value.trim() !== '') {
                setConfPassValid(true)
                setErrConfPass('')
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (currentPassword.trim() === '') {
            setCurrPassValid(false)
            setErrCurrPass('Please enter your current password')
            return
        }

        if (newPassword.trim() === '') {
            setNewPassValid(false)
            setErrNewPass('Please enter your new password')
            return
        }

        if (newPassword.trim().length < 8) {
            setNewPassValid(false)
            setErrNewPass('Password must be at least 8 characters long')
            return
        }

        if (confirmPassword.trim() === '') {
            setConfPassValid(false)
            setErrConfPass('Please enter your confirm password')
            return
        }

        if (newPassword !== confirmPassword) {
            setNewPassValid(false)
            setConfPassValid(false)
            setErrNewPass('New password and confirm password do not match')
            return
        }

        try {
            const token = localStorage.getItem('token')
            console.log(token)
            const response = await handleChangePassword(token, currentPassword, newPassword)
            console.log('Data', response)

            if (response && response.errCode === 1) {
                setCurrPassValid(false)
                setErrCurrPass(response.errMessage)
            } else if (response && response.errCode === 4) {
                setNewPassValid(false)
                setConfPassValid(false)
                setErrNewPass(response.errMessage)
            } else if (response && response.errCode === 0) {
                alert(response.errMessage)
                window.location.reload();
            }
        } catch (error) {
            console.error('Change password error:', error)
        }
    };

    return (
        <div>
            <NavBar/>
            <div className='d-flex'>
                <SideBar/>
                <div className="container">
                    <div className='col-12 col-md-8 col-lg-6 col-xl-5 p-5 justify-content-center mx-auto'>
                        <form className="change-password-form" onSubmit={handleSubmit}>
                            <h2 className='text-center my-5'>Change Password</h2>
                            <div className="form-group">
                                <label htmlFor="currentPassword">Current Password</label>
                                <input 
                                type="password" 
                                className={`form-control ${!currPassValid ? 'is-invalid' : ''}`} 
                                id="currentPassword" 
                                name="currentPassword" 
                                value={currentPassword} 
                                onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                    {errCurrPass}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input 
                                type="password" 
                                className={`form-control ${!newPassValid ? 'is-invalid' : ''}`} 
                                id="newPassword" 
                                name="newPassword"  
                                value={newPassword} 
                                onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                    {errNewPass}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                type="password" 
                                className={`form-control ${!confPassValid ? 'is-invalid' : ''}`} 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                value={confirmPassword} 
                                onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                    {errConfPass}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default ChangePassword;