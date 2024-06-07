import React, { useState } from "react";
import "./ChangePassword.css"
const ChangePassword = () => {
    const [storedPassword, setStoredPassword] = useState("initialPassword"); // Assuming an initial password
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (currentPassword !== storedPassword) {
            setError("Current password is incorrect");
            setSuccess("");
        } else if (newPassword !== confirmNewPassword) {
            setError("New passwords do not match");
            setSuccess("");
        } else {
            setError("");
            setSuccess("Password changed successfully");
            setStoredPassword(newPassword); // Update the stored password to the new password
            setCurrentPassword(""); // Clear the current password field
            setNewPassword(""); // Clear the new password field
            setConfirmNewPassword(""); // Clear the confirm new password field
        }
    };

    return (
        <div className="justify-content-center bg-white mx-auto px-3 changePassword">
            
            <form onSubmit={handleSubmit} className="w-100">
                <table className="">
                        <tr className="">
                            <td className="label">Current Password:</td>
                            <td><input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            </td>
                        </tr>
                        <tr className="">
                            <td className="label">New Password:</td>
                            <td><input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            </td>
                        </tr>
                        <tr className="">
                            <td className="label">Confirm New Password:</td>
                            <td><input
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button type="submit" className="btn bg-transparent float-end">Change</button></td>
                        </tr>
                </table>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </form>
        </div>
    );
};

export default ChangePassword;
