import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthContext } from '../context/AuthContext'
import { handleShowProfile, handleUpdateProfile, handleDeleteUserAccount } from '../services/userService'

import './Profile.scss' 
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

const Profile = () => {
    const { isAuthenticated, logout } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        let ignore = false

        const fetchData = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const response = await handleShowProfile(token)
                if (!ignore) {
                    setProfile(response.data.user)
                }
            } catch (error) {
                if (!ignore) {
                    setError(error) 
                    console.error('Error fetching profile:', error)
                }
            } finally {
                if (!ignore) {
                    setLoading(false) 
                }
            }
        }
        fetchData()

        return () => {
            ignore = true 
        }
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

    const handleDeleteAccount = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')

            const response = await handleDeleteUserAccount(token)
            alert(response.errMessage)
            logout()
            window.parent.location = '/';
        } catch (error) {
            console.error('Error deleting proflie:', error)
        }
    }

    if (loading) {
        return (
            <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <NavBar/>
            <div className='d-flex'>
                <SideBar/>
                <div className='profile container'>
                    <form onSubmit={handleChangeProfile}>
                        <div className='form-row mb-3'>
                            <div className='col'>
                                <label htmlFor='firstname' className='col-form-label'>First Name</label>
                                <input
                                    type='text'
                                    id='firstname'
                                    name='Firstname'
                                    value={profile?.Firstname || ''}
                                    onChange={handleChange}
                                    className='form-control'
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className='form-row mb-3'>
                            <div className='col'>
                                <label htmlFor='lastname' className='col-form-label'>Last Name</label>
                                <input
                                    type='text'
                                    id='lastname'
                                    name='Lastname'
                                    value={profile?.Lastname || ''}
                                    onChange={handleChange}
                                    className='form-control'
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className='form-row mb-3'>
                            <div className='col'>
                                <label htmlFor='address' className='col-form-label'>Address</label>
                                <input
                                    type='text'
                                    id='address'
                                    name='Address'
                                    value={profile?.Address || ''}
                                    onChange={handleChange}
                                    className='form-control'
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className='form-row mb-3'>
                            <div className='col'>
                                <label htmlFor='email' className='col-form-label'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='Email'
                                    value={profile?.Email || ''}
                                    onChange={handleChange}
                                    className='form-control'
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className='form-row mb-3'>
                            <div className='col'>
                                <label htmlFor='phone' className='col-form-label'>Phone</label>
                                <input
                                    type='text'
                                    id='phone'
                                    name='Phone'
                                    value={profile?.Phone || ''}
                                    onChange={handleChange}
                                    className='form-control'
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    {!isEditing ? (
                        <div className='form-row'>
                            <div className='col'>
                                <button className='btn btn-primary' onClick={handleEditClick}>Edit</button>
                            </div>
                            <Button variant='secondary' onClick={() => setShowModal(true)}>
                                Delete Account
                            </Button>
                        </div>
                    ) : (
                        <div className='form-row'>
                            <div className='col'>
                                <button type='submit' className='btn btn-success'>Save</button>
                                <button type='button' className='btn btn-secondary' onClick={handleEditCancel}>Cancel</button>
                            </div>
                        </div>
                    )}
                    </form>

                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Account Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant='danger' onClick={handleDeleteAccount}>
                                Delete Account
                            </Button>
                        </Modal.Footer>
                    </Modal>          
                </div>
            </div>
        </div>
    )         
}

export default Profile
