import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { handleShowProfile, handleUpdateProfile } from '../services/userService';
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

    const handleChangeProfile = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await handleUpdateProfile(token, profile);
        } catch (error) {
          
        }
        setIsEditing(false);
        
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

  return (
      <div className='profile w-100 justify-content-center border bg-white mx-auto px-5'>
          {!isEditing ? (
              <div>
                <table className='mx-auto'>
                  <tr>
                    <td className='label'>
                      <h6>First Name</h6>
                    </td>
                    <td>
                      {profile.Firstname}
                    </td>
                    <td className='label'>
                      <h6>Last Name</h6>
                    </td>
                    <td>
                      {profile.Lastname}
                    </td>
                  </tr>
                  <tr>
                    <td className='label'>
                      <h6>Address</h6>
                    </td>
                    <td>
                      {profile.Address}
                    </td>
                    <td className='label'>
                      <h6>Email</h6>
                    </td>
                    <td>
                      {profile.Email}
                    </td>
                  </tr>
                  <tr>
                    <td className='label'>
                      <h6>Phone</h6>
                    </td>
                    <td>
                      {profile.Phone}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td><button onClick={handleEditClick}>Edit</button></td> 
                  </tr>
                </table>
              </div>
          ) : (
            <form onSubmit={handleChangeProfile} className='mx-auto'>
              <h2>Edit Account Information</h2>
              <div>
                <label className='label'>
                  First Name:
                  <input
                    type="text"
                    name="Firstname"
                    value={profile.Firstname || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className='label'>
                  Last Name:
                  <input
                    type="text"
                    name="Lastname"
                    value={profile.Lastname || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className='label'>
                  Address:
                  <input
                    type="text"
                    name="Address"
                    value={profile.Address || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className='label'>
                  Email:
                  <input
                    type="email"
                    name="Email"
                    value={profile.Email || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className='label'>
                  Phone:
                  <input
                    type="tel"
                    name="Phone"
                    value={profile.Phone || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={handleEditClick}>Cancel</button>
            </form>
          )}
  </div>
  )
}
export default Profile;
