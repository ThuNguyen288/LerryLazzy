import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { handleShowProductDetail, handleUserShowCart } from '../services/cartService'

import 'bootstrap/dist/css/bootstrap.min.css'

import './CartPage.scss'

const CartPage = () => {
    const [cartData, setCartData] = useState({
        errCode: 0,
        errMessage: '',
        cart: [],
        numberProduct: 0
    })

    const [productDetails, setProductDetails] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await handleUserShowCart(token)
                console.log('Đây là response:', response.cart)
                setCartData(response)

                const detailsPromises = response.cart.map(async (item) => {
                    const product = await handleShowProductDetail(item.ProductID)
                    console.log (item.ProductID)
                    return product
                })

                const productDetails = await Promise.all(detailsPromises)
                console.log('Đây là product:', productDetails)
                setProductDetails(productDetails)

                const total = response.cart.reduce((sum, item, index) => {
                    const price = productDetails[index]?.data?.Price || 0
                    return sum + item.Quantity * price
                }, 0)
                setTotalPrice(total)

                const shipping = calculateShippingCost(total)
                setShippingCost(shipping)
            } catch (error) {
                console.error('Error fetching cart data:', error)
            }
        }

        fetchCartData()
    }, [])

    const calculateShippingCost = (subtotal) => {
        if (subtotal < 100000) return 30000
        if (subtotal < 200000) return 20000
        if (subtotal < 300000) return 10000
        if (subtotal >= 400000) return 0;
        return 0;
    }

    const handleCheckout = async () => {
        try {
        // const response = await axios.post('/api/checkout', {})
        // console.log('Checkout successful:', response.data)
        // Do something after successful checkout, e.g., redirect to a confirmation page
        } catch (error) {
        console.error('Error during checkout:', error)
        }
    }

    return (
        <div>
            <h2>Shopping Cart</h2>
            <div className='container cart-content'>
                <div className='mb-5 row'>
                    <div className='col-lg-8'>
                        <div className='cart'>
                            <div className='cart-header text-center'>
                                <div className='row'>
                                    <div className='col-md-5 bg-primary'>Item</div>
                                    <div className='d-none d-md-block col'>
                                        <div className='row'>
                                            <div className='col-md-3 bg-danger'>Price</div>
                                            <div className='col-md-4 bg-primary'>Quantity</div>
                                            <div className='col-md-3 bg-danger'>Total</div>
                                            <div className='col-md-2 bg-primary'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cartData.errCode !== 0 ? (
                                <p>Your cart is empty!</p>
                            ) : (
                                <>
                                    {cartData.cart.length > 0 ? (
                                        <div className='cart-body'>
                                            {cartData.cart.map((item, index) => (
                                                <div className='cart-item' key={item.CartID}>
                                                    <div className='d-flex align-items-center justify-content-center row'>
                                                        <div className='col-md-5'>
                                                            <div className='d-flex align-items-center bg-primary'>
                                                                <Link to={`/product/detail/${item.ProductID}`}>
                                                                    {productDetails[index] && (
                                                                        <img className='cart-image' src={`${process.env.PUBLIC_URL}${productDetails[index].data.Image}`} alt={productDetails[index].data.ProductName} />
                                                                    )}
                                                                </Link>
                                                                <div className='cart-title text-start'>
                                                                    <Link className='text-uppercase text-dark' to={`/product/detail/${item.ProductID}`}>
                                                                    <strong>{productDetails[index] ? productDetails[index].data.Name : 'Loading...'}</strong>
                                                                    </Link>
                                                                    <div className='text-muted text-sm'>...</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mt-4 mt-md-0 col-md-7'>
                                                            <div className='align-items-center row'>
                                                                <div className='col-md-3'>
                                                                    <div className='row'>
                                                                        <div className='text-center text-md-centert col-md-12 col-6'>
                                                                        {productDetails[index] ? productDetails[index].data.Price : 'Loading...'} đ
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-4'>
                                                                    <div className='align-items-center row  bg-primary'>
                                                                        <div className='col-md-12 col-sm-3'>
                                                                            <div className='d-flex align-items-center justify-content-center'>
                                                                                <div className='btn btn-items btn-items-decrease'>-</div>
                                                                                <input type='text' className='text-center input-items quant' value={item.Quantity} readOnly/>
                                                                                <div className='btn btn-items btn-items-increase'>+</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-3'>
                                                                    <div className='row'>
                                                                        <div className='text-end text-md-center col-md-12 col-6'>
                                                                            {productDetails[index] ? (item.Quantity * productDetails[index].data.Price) : 'Loading...'} đ
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='d-none d-md-block text-center col-2'>
                                                                    <div className='cart-remove'>
                                                                        <sgv aria-hidden='true' focusable='false' data-prefix='fas' data-icon='xmark' className='svg-inline--fa fa-xmark delete'></sgv>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='block mb-5'>
                            <div className='block-header'>
                                <h6 className='text-uppercase mb-0'>Order Summary</h6>
                            </div>
                            <div className='block-body bg-light pt-1'>
                                <p className='text-sm'>Shipping and additional costs are calculated based on values you have entered.</p>
                                <ul className='order-summary mb-0 list-unstyled'>
                                    <li className='order-summary-item'>
                                        <span>Order subtotal</span>
                                        <span>{totalPrice} đ</span>
                                    </li>
                                    <li className='order-summary-item'>
                                        <span>Shipping and handling</span>
                                        <span>{shippingCost} đ</span>
                                    </li>
                                    <li className='order-summary-item'>
                                        <span>Discount</span>
                                        <span>$0.00</span>
                                    </li>
                                    <li className='order-summary-item'>
                                        <span>Total</span>
                                        <strong className='order-summary-total'>{(totalPrice + shippingCost)} đ</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='my-5 d-flex justify-content-between flex-column flex-lg-row'>
                            <a role='button' className='text-muted btn btn-link'>
                                Continue Shopping
                            </a>
                            <button type='button' className='btn btn-dark'>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CartPage
