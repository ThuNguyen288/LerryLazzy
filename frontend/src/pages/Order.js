import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { handleShowAllOrders } from '../services/orderService'

import './Order.scss'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await handleShowAllOrders(token)

                setOrders(response.orders)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching orders data:', error)
            }
        }
        fetchCartData()
    }, [])

    const getBadgeClass = (status) => {
        switch (status) {
            case 'Pending Confirmation':
                return 'badge-pending-confirm'
            case 'Pending Pickup':
                return 'badge-pending-pickup'
            case 'Pending Delivery':
                return 'badge-pending-delivery'
            case 'Delivered':
                return 'badge-delivered'
            case 'Cancelled':
                return 'badge-cancelled'
            default:
                return 'badge-other'
        }
    }

    if (loading) {
        return (
            <div>
                <NavBar/>
                <div className='container'>
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb justify-content-start no-border my-4'>
                            <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Account</li>
                        </ol>
                    </nav>
                </div>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Account</h1>
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 mb-5'>
                            <SideBar/>
                        </div>
                        <div className='col-lg-8 col-xl-9 d-flex align-items-center justify-content-center'>
                            <Spinner animation='border' role='status'>
                                <span className='visually-hidden'>Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <NavBar/>
            <div className='container'>
                    <nav aria-label='breadcrumb'>
                        <ol className='breadcrumb justify-content-start no-border my-4'>
                            <li className='breadcrumb-item'><Link className='breadcrumb-link' to='/home'>Home</Link></li>
                            <li className='breadcrumb-item active' aria-current='page'>Account</li>
                        </ol>
                    </nav>
                </div>
                <div className='hero-content pb-4 text-center'>
                    <h1 className='hero-heading'>Your Orders</h1>
                </div> 
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 mb-5'>
                            <SideBar/>
                        </div>
                        <div className='col-lg-8 col-xl-9 order-body'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr className='table-head'>
                                        <th scope='col' className='py-4 text-uppercase text-sm'>Order #</th>
                                        <th scope='col' className='py-4 text-uppercase text-sm'>Date</th>
                                        <th scope='col' className='py-4 text-uppercase text-sm'>Total</th>
                                        <th scope='col' className='py-4 text-uppercase text-sm'>Status</th>
                                        <th scope='col' className='py-4 text-uppercase text-sm'>Action</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <div className='text-center py-4'>
                                            <p>No purchase history!</p>
                                        </div>
                                    ) : (
                                        orders.map(order => (
                                            <tr key={order.OrderID}>
                                                <td scope='row' className='py-4 align-middle fw-bold'>
                                                    <div className='text-center'># {order.OrderID}</div>
                                                </td>
                                                <td className='py-4 align-middle'>
                                                    <div className='text-center'>{order.OrderDate}</div>
                                                </td>
                                                <td className='py-4 align-middle'>{order.TotalPrice.toLocaleString('vi-VN')} đ</td>
                                                <td className='py-4 align-middle'>
                                                    <span className={`badge p-2 text-uppercase ${getBadgeClass(order.Status)}`}>{order.Status}</span>
                                                </td>
                                                <td className='py-4 align-middle'>
                                                    <Link to={`/order/${order.OrderID}`} className='btn btn-outline-dark btn-sm'>View</Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Order
