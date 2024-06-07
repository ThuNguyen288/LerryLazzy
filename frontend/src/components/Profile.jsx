import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap CSS
import Spinner from 'react-bootstrap/Spinner';


import { AuthContext } from '../context/AuthContext'
import { handleShowProfile, handleUpdateProfile } from '../services/userService'

import "./Profile.css" 

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true)
          try {
            const token = localStorage.getItem('token')
            const response = await handleShowProfile(token)
            setProfile(response.data.user)
          } catch (error) {
            setError(error) 
            console.error('Error fetching profile:', error)
          } finally {
            setLoading(false) 
          }
        }
        fetchData()
      }, [isAuthenticated.token])

    const handleEditClick = (event) => {
        event.preventDefault()
        setIsEditing(true)
    }

    const handleEditCancel = (event) => {
        event.preventDefault()
        setIsEditing(false)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const handleChangeProfile = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')

            await handleUpdateProfile(token, profile)

            const responseShow = await handleShowProfile(token)
        
            setProfile(responseShow.data.user)
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className='profile container'>
            <form onSubmit={handleChangeProfile}>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="firstname" className="col-form-label">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="Firstname"
                            value={profile.Firstname || ''}
                            onChange={handleChange}
                            className="form-control"
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="lastname" className="col-form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="Lastname"
                            value={profile.Lastname || ''}
                            onChange={handleChange}
                            className="form-control"
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="address" className="col-form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="Address"
                            value={profile.Address}
                            onChange={handleChange}
                            className="form-control"
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="email" className="col-form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="Email"
                            value={profile.Email || ''}
                            onChange={handleChange}
                            className="form-control"
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="phone" className="col-form-label">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="Phone"
                            value={profile.Phone || ''}
                            onChange={handleChange}
                            className="form-control"
                            disabled={!isEditing}
                        />
                    </div>
                </div>
            {!isEditing ? (
                <div className="form-row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                    </div>
                </div>
            ) : (
                <div className="form-row">
                    <div className="col">
                        <button type="submit" className="btn btn-success">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>
                    </div>
                </div>
            )}
            </form>
        </div>
    )         
}

export default Profile
