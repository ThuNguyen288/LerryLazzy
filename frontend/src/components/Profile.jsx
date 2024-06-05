import React, { useState } from 'react';
import "./Profile.css"
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    firstname: 'Thu',
    lastname:'Nguyen',
    address:'HCM city',
    email: 'LerryLazzy@gmail.com',
    phone: '123-456-7890'
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className='profile'>
      {!isEditing ? (
        <div>
          <h2>Account Information</h2>
          <p><strong>First Name:</strong> {accountInfo.firstname}</p>
          <p><strong>Last Name:</strong> {accountInfo.lastname}</p>
          <p><strong>Address:</strong> {accountInfo.address}</p>
          <p><strong>Email:</strong> {accountInfo.email}</p>
          <p><strong>Phone:</strong> {accountInfo.phone}</p>
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
                value={accountInfo.firstname}
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
                value={accountInfo.lastname}
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
                value={accountInfo.address}
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
                value={accountInfo.email}
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
                value={accountInfo.phone}
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
