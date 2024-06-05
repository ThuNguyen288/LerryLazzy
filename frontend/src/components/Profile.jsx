import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { handleShowProfile } from '../services/userService';
import "./Profile.css";

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

            const user = await handleShowProfile(token);
            setProfile(user.data);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
      <div className='profile'>
          {!isEditing ? (
              <div>
                  <h2>Account Information</h2>
                  <p><strong>First Name:</strong>{profile.Firstname}</p>
                  <p><strong>Last Name:</strong>{profile.Lastname}</p>
                  <p><strong>Address:</strong>{profile.Address}</p>
                  <p><strong>Email:</strong>{profile.Email}</p>
                  <p><strong>Phone:</strong>{profile.Phone}</p>
                  <button onClick={handleEditClick}>Edit</button>
              </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2>Edit Account Information</h2>
              <div>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstname"
                    value={profile.Firstname}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastname"
                    value={profile.Lastname}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={profile.Address}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={profile.Email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Phone:
                  <input
                    type="tel"
                    name="phone"
                    value={profile.Phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={handleEditClick}>Cancel</button>
            </form>
          )}
        </div>
    );
};

export default Profile;
