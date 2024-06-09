import React, { useEffect, useState } from 'react'
import { BsDash, BsPlus } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { handleShowProductDetail, handleUserDecreaseItem, handleUserIncreaseItem, handleUserRemoveFromCart, handleUserShowCart } from '../services/cartService'

import 'bootstrap/dist/css/bootstrap.min.css'

import './CartItem.scss'

const Cart = () => {
    const [cartData, setCartData] = useState({
        errCode: 0,
        errMessage: '',
        cart: [],
        numberProduct: 0
    })

    const [productDetails, setProductDetails] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)

    const updateCartData = async (token) => {
        const response = await handleUserShowCart(token)
        setCartData(response)
    
        const detailsPromises = response.cart.map(async (item) => {
            const product = await handleShowProductDetail(item.ProductID)
            return product
        })
    
        const productDetails = await Promise.all(detailsPromises)
        setProductDetails(productDetails)
    
        const total = response.cart.reduce((sum, item, index) => {
            const price = productDetails[index]?.data?.Price || 0
            return sum + item.Quantity * price
        }, 0)
        setTotalPrice(total)
    
        const shipping = calculateShippingCost(total)
        setShippingCost(shipping)
    }

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token')
                await updateCartData(token)
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
        if (subtotal >= 400000) return 0
        if (subtotal === 0) return 0
        return 0
    }

    const handleIncreaseItem = async (event) => {
        event.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const productIdToIncrease = event.currentTarget.dataset.productid

            await handleUserIncreaseItem(token, productIdToIncrease)
            console.log(productIdToIncrease)

            await updateCartData(token)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleRemoveItem = async (event) => {
        try {
            const token = localStorage.getItem('token')
            const productIdToRemove = event.currentTarget.dataset.productid

            await handleUserRemoveFromCart(token, productIdToRemove)
            
            await updateCartData(token)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    

    const handleDecreaseItem = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const productIdToDecrease = event.currentTarget.dataset.productid;

            await handleUserDecreaseItem(token, productIdToDecrease);
            console.log(productIdToDecrease);

            await updateCartData(token);
        } catch (error) {
            console.error('Error decreasing product quantity:', error);
        }
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
            <div className='container cart-content'>
                <div className='mb-5 row'>
                    <div className='col-lg-8'>
                        <div className='cart'>
                            <div className='cart-header text-center'>
                                <div className='row'>
                                    <div className='col-md-5'>Item</div>
                                    <div className='d-none d-md-block col'>
                                        <div className='row'>
                                            <div className='col-md-3'>Price</div>
                                            <div className='col-md-4'>Quantity</div>
                                            <div className='col-md-3'>Total</div>
                                            <div className='col-md-2'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cartData.errCode !== 0 ? (
                                <div className='col-lg my-5'>
                                    <div className='text-center' style={{fontSize: '25px'}}>
                                        <p>Your cart is empty!</p>
                                    </div>
                                    <div className='text-end justify-content-center'>
                                        <label className='shop-now mx-2' role='button'>Shop now</label>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15" height="15"><path d="M4.7 10c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L6.9 6 4.2 3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7c-.2.2-.4.3-.6.3Z"></path></svg>
                                    </div>
                                    
                                </div>
                            ) : (
                                <>
                                    {cartData.cart.length > 0 ? (
                                        <div className='cart-body'>
                                            {cartData.cart.map((item, index) => (
                                                <div className='cart-item' key={item.CartID}>
                                                    <div className='d-flex align-items-center justify-content-center row'>
                                                        <div className='col-md-5'>
                                                            <div className='d-flex'>
                                                                <Link to={`/product/detail/${item.ProductID}`}>
                                                                    {productDetails[index] && (
                                                                        <img className='cart-image' src={`${process.env.PUBLIC_URL}${productDetails[index].data.Image}`} alt={productDetails[index].data.ProductName} />
                                                                    )}
                                                                </Link>
                                                                <div className='cart-title text-start align-items-start mt-2'>
                                                                    <Link className='text-uppercase' to={`/product/detail/${item.ProductID}`}>
                                                                        <label>{productDetails[index] ? productDetails[index].data.Name : 'Loading...'}</label>
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
                                                                    <div className='align-items-center row'>
                                                                        <div className='col-md-12 col-sm-3'>
                                                                            <div className='d-flex align-items-center justify-content-center'>
                                                                                <div className='btn btn-items btn-items-decrease'>
                                                                                    <BsDash size={20} onClick={handleDecreaseItem} data-productid={item.ProductID}/>
                                                                                </div>
                                                                                <input type='text' className='text-center input-items quant' value={item.Quantity} readOnly/>
                                                                                <div className='btn btn-items btn-items-increase'>
                                                                                    <BsPlus size={20} onClick={handleIncreaseItem} data-productid={item.ProductID}/>
                                                                                </div>
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
                                                                    <div className='cart-remove' role='button' data-productid={item.ProductID} onClick={handleRemoveItem}>
                                                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12'><path d='M2.22 2.22a.749.749 0 0 1 1.06 0L6 4.939 8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6 9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061 3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6 2.22 3.28a.749.749 0 0 1 0-1.06Z'></path></svg>
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
                            <div className='d-flex my-2'>
                                <input placeholder='Enter your promotion...'></input>
                                <button>Add</button>
                            </div>
                            <button type='button' className='btn btn-dark '>
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='my-5 d-flex justify-content-between flex-column flex-lg-row'>
                            <a role='button' className='text-muted btn-n btn-link'>
                                <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-left' className='svg-inline--fa fa-chevron-left ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="13" height="13"><path d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"></path></svg> 
                                <label role='button' className='btn-name mx-2'>Continue Shopping</label>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
