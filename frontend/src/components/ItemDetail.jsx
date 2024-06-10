import 'bootstrap/dist/css/bootstrap.min.css'
import { addDays, format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { BsClock, BsTruck } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { handleUserAddLargeItem } from '../services/cartService'
import { getProductById } from '../services/productService'
import './ItemDetail.scss'

const ItemDetail = () => {
    const { productid } = useParams()
    const { updateCartQuantity } = useContext(CartContext)

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantityNumber, setQuantityNumber] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productid)
                setProduct(response)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching product details:', error)
                setError(error.message)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productid])

    const getEstimatedDeliveryDate = () => {
        const currentDate = new Date();
        const startDate = addDays(currentDate, 3);
        const endDate = addDays(currentDate, 7);
        const formattedStartDate = format(startDate, 'dd');
        const formattedEndDate = format(endDate, 'dd MMM, yyyy');
        return `${formattedStartDate} - ${formattedEndDate}`;
    }

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill={i <= rating ? 'gold' : 'gray'}
                >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696 2.06-4.152c.197-.396.73-.396.927 0l2.06 4.152 4.898.696c.441.062.612.63.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            );
        }
        return stars;
    }

    const handleIncrement = () => {
        setQuantityNumber(quantityNumber + 1)
    }
    
    const handleDecrement = () => {
        if (quantityNumber > 1) {
          setQuantityNumber(quantityNumber - 1)
        }
    }

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token')
            const productid = product.ProductID

            await handleUserAddLargeItem (token, productid, quantityNumber)
            alert('Add to cart successfully!')
            
            updateCartQuantity()
        } catch (error) {
            console.error('Error in adding product to cart:', error)
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
        return <div>Error: {error}</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 pb-4 pb-md-0 mb-2 mb-sm-3 mb-md-0 d-flex justify-content-end' style={{maxHeight: '550px'}}>
                    <img className='product-img me-5' src={`${process.env.PUBLIC_URL}${product.Image}`} alt={product.Name} />
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-between position-relative' style={{maxHeight: '550px'}}>
                    <div className='ps-md-4 ps-xl-0 me-5'>
                        <div className='row my-1'>
                            <div className='col'>
                                <a className='d-none d-md-flex align-items-center gap-2 text-decoration-none mb-3' href='#review'>
                                    <div className='d-flex gap-1 fs-sm'>
                                        {renderStars(product.AverageRating)}
                                    </div>
                                    <span className='text-body-tertiary fs-sm'>{product.TotalReviews} reviews</span>
                                </a>
                            </div>
                            <div className='col-auto'>
                                <button className='animate-pulse bg-transparent border-0'>
                                    <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <h1 className='h1 producttitle'>{product.Name}</h1>
                        <p className='fs-sm mb-0 text-secondary'>{product.Description}</p>
                        <div className='collapse' id='moreDescription'>Read more</div>
                        <div className='h4 d-flex align-items-center my-4 price'>{product.Price.toLocaleString('vi-VN')} đ</div>
                        <div className='position-absolute bottom-0 info'>
                            <div className='d-flex gap-3 pb-3 pb-lg-4 mb-3'>
                                <div className='count-input flex-shrink-0'>
                                    <button className='btn btn-icon btn-lg' type='button' data-decrement aria-label='Decrement quantity' onClick={handleDecrement}>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'><path d='M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75Z'></path></svg>
                                    </button>
                                    <input type='number' className='form-control form-control-lg quantity-number' min='1' value={quantityNumber} onChange={(event) => setQuantityNumber(event.target.value)}/>
                                    <button className='btn btn-icon btn-lg' type='button' data-increment aria-label='Increment quantity' onClick={handleIncrement}>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'><path d='M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z'></path></svg>
                                    </button>
                                </div>
                                <button className='btn btn-lg btn-dark w-100' type='submit' onClick={handleAddToCart}>Add to cart</button>
                            </div>
                            <ul className='list-unstyled gap-3'>
                                <li className='d-flex flex-wrap fs-sm'>
                                    <span className='d-flex align-items-center fw-medium text-dark-emphasis me-2'>
                                        <BsClock className='icon-small fs-base me-2'/>
                                        Estimated delivery:
                                    </span>
                                    {getEstimatedDeliveryDate()}
                                </li>
                                <li className='d-flex flex-wrap fs-sm space'></li>
                                <li className='d-flex flex-wrap fs-sm'>
                                    <span className='d-flex align-items-center fw-medium text-dark-emphasis me-2'>
                                        <BsTruck className='icon-small fs-base me-2'/>
                                        Free shipping & returns:
                                    </span>
                                    On all order over 400.000 đ
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail