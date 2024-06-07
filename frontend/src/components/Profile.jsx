import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { handleShowProfile, handleUpdateProfile } from '../services/userService';
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("This is token:", token);

                const response = await handleShowProfile(token);
                console.log("Fetched user data:", response.data);
                setProfile(response.data.user);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [isAuthenticated.token]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleChangeProfile = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            let response = await handleUpdateProfile(token, profile);
            alert(response.data.message);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
        setIsEditing(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='profile container'>
            {!isEditing ? (
                <div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <h6>First Name</h6>
                            <p>{profile.Firstname}</p>
                        </div>
                        <div className="col-md-6">
                            <h6>Last Name</h6>
                            <p>{profile.Lastname}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <h6>Address</h6>
                            <p>{profile.Address}</p>
                        </div>
                        <div className="col-md-6">
                            <h6>Email</h6>
                            <p>{profile.Email}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <h6>Phone</h6>
                            <p>{profile.Phone}</p>
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>
                </div>
            ) : (
                <form onSubmit={handleChangeProfile} className='mx-auto'>
                    <h2>Edit Account Information</h2>
                    <div className="form-group">
                        <label className='label'>
                            First Name:
                            <input
                                type="text"
                                className="form-control"
                                name="Firstname"
                                value={profile.Firstname || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className='label'>
                            Last Name:
                            <input
                                type="text"
                                className="form-control"
                                name="Lastname"
                                value={profile.Lastname || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className='label'>
                            Address:
                            <input
                                type="text"
                                className="form-control"
                                name="Address"
                                value={profile.Address || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className='label'>
                            Email:
                            <input
                                type="email"
                                className="form-control"
                                name="Email"
                                value={profile.Email || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className='label'>
                            Phone:
                            <input
                                type="tel"
                                className="form-control"
                                name="Phone"
                                value={profile.Phone || ''}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={handleEditClick}>Cancel</button>
                </form>
            )}
        </div>
    )
}

export default Profile;
