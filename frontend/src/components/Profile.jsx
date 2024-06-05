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
      <div className='profile w-100 justify-content-center border bg-white p-3 container mx-auto'>
          {!isEditing ? (
              <div>
                <h4 className='text-center'>Account Information</h4>
                <table className='mx-auto'>
                  <tr>
                    <td className='label'>
                      <h6>First Name</h6>
                    </td>
                    <td>
                      {profile.Firstname}
                    </td>
                  </tr>
                  <tr>
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
                  </tr>
                  <tr>
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
                    <button onClick={handleEditClick}>Edit</button>
                  </tr>
                </table>
              </div>
          ) : (
              <form onSubmit={handleSubmit} className='mx-auto'>
                <h4 className='text-center'>Account Information</h4>
                <table className='mx-auto'>
                  <tr>
                    <td className='label'>
                      <h6>First Name</h6>
                    </td>
                    <td>
                      <input
                      type="text"
                      name="firstname"
                      value={profile.Firstname}
                      onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='label'>
                      <h6>Last Name</h6>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="lastname"
                        value={profile.Lastname}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='label'>
                      <h6>Address</h6>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={profile.Address}
                        onChange={handleChange}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className='label'>
                      <h6>Email</h6>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Email"
                        value={profile.Email}
                        onChange={handleChange}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td className='label'>
                      <h6>Phone</h6>
                    </td>
                    <td>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.Phone}
                      onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button type="submit">Save</button>
                    </td>
                    <td>
                      <button type="button" onClick={handleEditClick}>Cancel</button>
                    </td>
                  </tr>
                </table>
            </form>
          )}
  </div>
  )
}
export default Profile;
