import React, { useState } from "react";
import "./ForgotPassword.css"
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    return(
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark back-ground" style={{ borderRadius: '1rem' }}>
                            <div className="card-body px-5 py-4">
                                <div className="mb-md-5 mt-md-4 forgot">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center text-white">Forgot Password</h2>            
                                    <form className="w-100">
                                        <table className="">
                                                <tr className="m-5">
                                                    <td className="text-white">Email:</td>
                                                    <td><input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="...@gmail.com"
                                                        onChange={setEmail}
                                                    />
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <td className="text-white">New Password:</td>
                                                    <td><input
                                                        type="password"
                                                        id="newPassword"
                                                        name="newPassword"
                                                    />
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <td className="text-white">Confirm New Password:</td>
                                                    <td><input
                                                        type="password"
                                                        id="confirmNewPassword"
                                                        name="confirmNewPassword"
                                                        value={confirmNewPassword}
                                                    />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td><button type="submit" className="btn bg-white float-end">Submit</button></td>
                                                </tr>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword;