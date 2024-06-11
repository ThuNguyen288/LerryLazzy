import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { FaArrowLeftLong } from 'react-icons/fa6'

import { AuthContext } from '../context/AuthContext'
import { handleShowProfile } from '../services/userService'
import { handleCreateNewOrder } from '../services/orderService'
import './Checkout.scss'

const Checkout = () => {
    const { isAuthenticated } = useContext(AuthContext)

    const [profile, setProfile] = useState({})

    const [activeStep, setActiveStep] = useState(0)
    const [activeAccordion, setActiveAccordion] = useState(null)
    const [useDifferentAddress, setUseDifferentAddress] = useState(false)

    const [shippingAddress, setShippingAddress] = useState(profile.Address !== undefined ? profile.Address : '')
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [subTotal, setSubTotal] = useState(0)
    const [shippingFee, setShippingFee] = useState(0)
    const [deliveryMethod, setDeliveryMethod] = useState(null)
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const totalPriceFromLocalStorage = localStorage.getItem('subTotal')
        if (totalPriceFromLocalStorage) {
            setSubTotal(parseFloat(totalPriceFromLocalStorage))
        }
    }, [])

    const handleBackStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
        if (activeStep === 0) {
            window.location.href='/cart'
        }
    }

    useEffect(() => {
        let ignore = false

        const fetchData = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const response = await handleShowProfile(token)
                console.log(response)
                if (!ignore) {
                    const fullname = response.user.Lastname + ' ' + response.user.Firstname
                    setProfile({
                        ...response.user,
                        Fullname: fullname
                    })
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

    const handleCheckboxChange = () => {
        setUseDifferentAddress(!useDifferentAddress)
    }

    const handleShippingAddressChange = (event) => {
        setShippingAddress(event.target.value)
    }

    const handleGetShippingAddress = (event) => {
        event.preventDefault()
        // setShippingAddress(event.target.value)
        setActiveStep(1)
        console.log('Shipping address:', shippingAddress)
    }

    const handleDeliveryMethodChange = (event) => {
        setDeliveryMethod(event.target.value)
    }

    const handleGetDeliveryMethod = (event) => {
        event.preventDefault()
        // setDeliveryMethod(event.target.value)
        setActiveStep(2)
        console.log('Delivery method:', deliveryMethod)
    }

    const calculateShippingFee = (deliveryMethod, orderTotal) => {
        let fee = 0
        if (orderTotal >= 400000) {
            fee = 0
        } else {
            if (deliveryMethod === 'Usp Next Day') {
                fee = 50000
            } else if (deliveryMethod === 'Express Shipping') {
                fee = 35000
            } else if (deliveryMethod === 'Standard Shipping') {
                fee = 15000
            } else if (deliveryMethod === 'In Store Pickup') {
                fee = 0
            }
        }
        setShippingFee(fee)
    }

    useEffect(() => {
        calculateShippingFee(deliveryMethod, subTotal)
    }, [deliveryMethod, subTotal])

    const handleHeaderClick = (value) => {
        setPaymentMethod(value)

        if (activeAccordion === value) {
            setActiveAccordion(null) 
        } else {
            setActiveAccordion(value) 
        }
    }

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value)
    }

    const handleGetPaymentMethod = (event) => {
        event.preventDefault()
        // setPaymentMethod(event.target.value)
        setActiveStep(3)
        console.log('Payment method:', paymentMethod)
    }

    const totalPrice = subTotal + shippingFee;

    const orderData = {
        shippingAddress,
        paymentMethod,
        totalPrice,
        deliveryMethod
    }

    let handleCheckOut = async () => {
        try {
            let token = localStorage.getItem('token')
            console.log('Order data:', orderData)
            let response = await handleCreateNewOrder(token, orderData)
            console.log('Response:', response)
        } catch (error) {
            console.error('Error in handling checkout:', error)
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
        <div className="container">
            <div className='row'>
                <div className='col-lg-8'>
                    <ul className='custom-nav nav nav-pills mb-5'>
                        <li className='nav-item w-25'>
                            <a className={`nav-link text-sm ${activeStep === 0 ? 'active' : 'disabled'}`} href='#'>Address</a>
                        </li>
                        <li className='nav-item w-25'>
                            <a className={`nav-link text-sm ${activeStep === 1 ? 'active' : 'disabled'}`} href='#'>Delivery Method</a>
                        </li>
                        <li className='nav-item w-25'>
                            <a className={`nav-link text-sm ${activeStep === 2 ? 'active' : 'disabled'}`} href='#'>Payment Method</a>
                        </li>
                        <li className='nav-item w-25'>
                            <a className={`nav-link text-sm ${activeStep === 3 ? 'active' : 'disabled'}`} href='#'>Order Review</a>
                        </li>
                    </ul>
                    <form>
                        {activeStep === 0 && (
                            <div className='block'>
                                <div className='block-header'>
                                    <h6 className='text-uppercase mb-0'>Invoice address</h6>
                                </div>
                                <div className='block-body'>
                                    <div className='row'>
                                        <div className='form-group col-md-6'>
                                            <label className='form-label'>Full Name</label>
                                            <input type='text' className='form-control' value={profile.Fullname} disabled/>
                                        </div>
                                        <div className='form-group col-md-6'>
                                            <label className='form-label'>Email Address</label>
                                            <input type='text' className='form-control' value={profile.Email} disabled/>
                                        </div>
                                        <div className='form-group col-md-6'>
                                            <label className='form-label'>Phone Number</label>
                                            <input type='text' className='form-control' value={profile.Phone || ''} disabled/>
                                        </div>
                                        <div className='form-group col-md-6'>
                                            <label className='form-label'>Shipping Address</label>
                                            {useDifferentAddress ? (
                                                <input type='text' className='form-control' value={shippingAddress} onChange={handleShippingAddressChange} />
                                            ) : (
                                                <input type='text' className='form-control' value={profile.Address || ''} disabled/>
                                            )}                                        
                                        </div>
                                        <div className='form-check'>
                                            <input className='form-check-input' type='checkbox' id='sameAddress' checked={useDifferentAddress} onChange={handleCheckboxChange}/>
                                            <label className='form-check-label align-middle' htmlFor='sameAddress'>Use a different shipping address</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeStep === 1 && (
                            <div className='block-body'>
                                <div className='row'>
                                    <div className='mb-4 col-md-6 d-flex align-items-center'>
                                        <input type='radio' id='option0' name='shipping' value='Usp Next Day' onChange={handleDeliveryMethodChange}/>
                                        <label className='ms-3' htmlFor='option0'>
                                            <strong className='d-block text-uppercase mb-2'>Usp next day</strong>
                                            <span className='text-muted text-sm'>Get your order delivered next day</span>
                                        </label>
                                    </div>
                                    <div className='mb-4 col-md-6 d-flex align-items-center'>
                                        <input type='radio' id='option1' name='shipping' value='Standard Shipping' onChange={handleDeliveryMethodChange}/>
                                        <label className='ms-3' htmlFor='option1'>
                                            <strong className='d-block text-uppercase mb-2'>Standard Shipping</strong>
                                            <span className='text-muted text-sm'>Delivery within 5-7 business days</span>
                                        </label>
                                    </div>
                                    <div className='mb-4 col-md-6 d-flex align-items-center'>
                                        <input type='radio' id='option2' name='shipping' value='Express Shipping' onChange={handleDeliveryMethodChange}/>
                                        <label className='ms-3' htmlFor='option2'>
                                            <strong className='d-block text-uppercase mb-2'>Express Shipping</strong>
                                            <span className='text-muted text-sm'>Delivery within 2-3 business days</span>
                                        </label>
                                    </div>
                                    <div className='mb-4 col-md-6 d-flex align-items-center'>
                                        <input type='radio' id='option3' name='shipping' value='In Store Pickup' onChange={handleDeliveryMethodChange}/>
                                        <label className='ms-3' htmlFor='option3'>
                                            <strong className='d-block text-uppercase mb-2'>In-Store Pickup</strong>
                                            <span className='text-muted text-sm'>Pick up your order from our store</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeStep === 2 && (
                            <div className='mb-5'>
                                <div id='accordion' role='tablist'>
                                    <div className='block mb-3'>
                                        <div className='block-header' id='headingOne' role='tab' onClick={() => handleHeaderClick('Internet Banking')}>
                                            <strong>
                                                <input type='radio' className='me-2' id='internetBanking' name='payment' value='Internet Banking' checked={paymentMethod === 'Internet Banking'} onChange={handlePaymentMethodChange} />
                                                <a className='accordion-link text-decoration-none' data-bs-toggle='collapse' href='#collapseOne' aria-expanded={paymentMethod === 'Internet Banking'} aria-controls='collapseOne' role='radio' onClick={() => handleHeaderClick('Internet Banking')}>Internet Banking</a> 
                                            </strong>
                                        </div>
                                        <div className={`collapse ${activeAccordion === 'Internet Banking' ? 'show' : ''}`} id='collapseOne' role='tabpanel' aria-labelledby='headingOne' data-parent='#accordion'>
                                            <div className='block-body'>
                                                <div action='#'>
                                                    <div className='row'>
                                                        <div className='mb-3 col-md-6 haha px-5'>
                                                            <div className='row'>
                                                                <label className='mb-3 col-md-5'>Account Name:</label>
                                                                <span className='mb-3 col-md-7 text-sm'>VU TRA MY</span>
                                                                <label className='mb-3 col-md-5'>Account Number:</label>
                                                                <span className='mb-3 col-md-7 text-sm'>1234567890</span>
                                                                <label className='mb-3 col-md-5'>Bank Name:</label>
                                                                <span className='mb-3 col-md-7 text-sm'>Vietcombank</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3 col-md-6 px-5'>
                                                            <div className='row'>
                                                                <label className='mb-3 col-md-5'>Account Name:</label>
                                                                <span className='mb-3 col-md-7 text-sm'>NGUYEN THI KIM THU</span>
                                                                <label className='mb-3 col-md-5'>Account Number:</label>
                                                                <span className='mb-3 col-md-7 text-sm'>0987654321</span>
                                                                <label className='mb-3 col-md-5'>Bank Name:</label>
                                                                <span className='mb-3 col-md-7 text-sm'>Techcombank</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-2 col-md-12 text-end'>
                                                            <span className='notice'>Choose one and make payment, then take a photo of the bill</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='block mb-3'>
                                        <div className='block-header' id='headingTwo' role='tab' onClick={() => handleHeaderClick('E-Wallet')}>
                                            <strong>
                                                <input type='radio' className='me-2' id='eWallet' name='payment' value='E-Wallet' checked={paymentMethod === 'E-Wallet'} onChange={handlePaymentMethodChange} />
                                                <a className='accordion-link text-decoration-none' data-bs-toggle='collapse' href='#collapseTwo' aria-expanded={paymentMethod === 'E-Wallet'} aria-controls='collapseTwo' role='radio' onClick={() => handleHeaderClick('eWallet')}>E-Wallet</a> 
                                            </strong>
                                        </div>
                                        <div className={`collapse ${activeAccordion === 'E-Wallet' ? 'show' : ''}`} id='collapseTwo' role='tabpanel' aria-labelledby='headingTwo' data-parent='#accordion'>
                                            <div className='block-body'>
                                                <div action='#'>
                                                    <div className='row'>
                                                        <div className='mb-3 col-md-6'>
                                                            <div className='row d-flex align-items-center justify-content-center'>
                                                                <img className='col-md-12 border' src={`${process.env.PUBLIC_URL}/Zalopay.png`} style={{maxHeight: '350px', width: 'auto'}}></img>
                                                                <span className='col-md-12 text-center fw-bold mt-3'>ZaloPay</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-3 col-md-6'>
                                                            <div className='row d-flex align-items-center justify-content-center'>
                                                                <img className='col-md-12 border' src={`${process.env.PUBLIC_URL}Momo.png`} style={{maxHeight: '350px', width: 'auto'}}></img>
                                                                <span className='col-md-12 text-center fw-bold mt-3'>Momo</span>
                                                            </div>
                                                        </div>
                                                        <div className='mb-2 col-md-12 text-end'>
                                                            <span className='notice'>Choose one and make payment, then take a photo of the bill</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='block mb-3'>
                                        <div className='block-header' id='headingThree' role='tab' onClick={() => handleHeaderClick('Cash On Deliver')}>
                                            <strong>
                                                <input type='radio' className='me-2' id='cod' name='payment' value='Cash On Deliver' checked={paymentMethod === 'Cash On Deliver'} onChange={handlePaymentMethodChange} />
                                                <a className='accordion-link text-decoration-none' data-bs-toggle='collapse' href='#collapseThree' aria-expanded={paymentMethod === 'Cash On Deliver'} aria-controls='collapseThree' role='radio' onClick={() => handleHeaderClick('Cash On Deliver')}>Cash On Deliver</a>
                                            </strong>
                                        </div>
                                        <div className={`collapse ${activeAccordion === 'Cash On Deliver' ? 'show' : ''}`} id='collapseThree' role='tabpanel' aria-labelledby='headingThree' data-parent='#accordion'>
                                            <div className='block-body'>
                                                <div className='mb-2 col-md-12 text-start'>
                                                    <span >Pay after receive</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='mb-5 d-flex justify-content-between flex-column flex-lg-row'>
                            <a className='text-muted btn-back' onClick={handleBackStep} role='button'>
                                <FaArrowLeftLong className='ms-4'/>
                            </a>
                            {activeStep === 3 && (
                                <button type="button" className='btn btn-dark btn-next' onClick={handleCheckOut}>
                                    Place an other
                                    <i className='fas fa-chevron-right ms-2'></i>
                                </button>
                            )}
                            {activeStep === 2 && (
                                <button type="button" className='btn btn-dark btn-next' onClick={handleGetPaymentMethod}>
                                    Check your order
                                    <i className='fas fa-chevron-right ms-2'></i>
                                </button>
                            )}
                            {activeStep === 1 && (
                                <button type="button" className='btn btn-dark btn-next' onClick={handleGetDeliveryMethod}>
                                    Choose Payment Method
                                    <i className='fas fa-chevron-right ms-2'></i>
                                </button>
                            )}
                            {activeStep === 0 && (
                                <button type="button" className='btn btn-dark btn-next' onClick={handleGetShippingAddress}>
                                    Choose Delivery Method
                                    <i className='fas fa-chevron-right ms-2'></i>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className='col-lg-4'>
                    <div className='block mb-5'>
                        <div className='block-header'>
                            <h6 className='text-uppercase mb-0'>Order Summary</h6>
                        </div>
                        <div className='block-body bg-light pt-1'>
                            <p className='text-sm'>Shipping cost calculated at checkout</p>
                            <ul className='order-summary mb-0 list-unstyled'>
                                <li className='order-summary-item'>
                                    <span>Order subtotal</span>
                                    <span>{subTotal.toLocaleString('vi-VN')} đ</span>
                                </li>
                                <li className='order-summary-item'>
                                    <span>Shipping and handling</span>
                                    <span>{shippingFee.toLocaleString('vi-VN')} đ</span>
                                </li>
                                <li className='order-summary-item position-relative'>
                                    <span>Discount</span>
                                    <span>0 đ</span>
                                </li>
                                <li className='order-summary-item position-relative'>
                                    <span>Total</span>
                                    <strong className='order-summary-total'>{totalPrice.toLocaleString('vi-VN')} đ</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
