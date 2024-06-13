import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { Link, useParams } from 'react-router-dom'

import { CartContext } from '../context/CartContext'
import { handleUserAddToCart } from '../services/cartService'
import { getHotProduct } from '../services/productService'

import './Item.scss'

const HotItem = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { updateCartQuantity } = useContext(CartContext)
    const { productid } = useParams()
    
    console.log(productid)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                let response = await getHotProduct()
                if (response) {
                    setProducts(response)
                    setLoading(false)
                }
                
            } catch (error) {
                console.error('Error fetching products: ', error)
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleAddToCart = async (id) => {
        try {
            if (!id) {
                console.error('Error: Invalid product')
                return
            }
            const token = localStorage.getItem('token')
            if (!token) {
                alert('You need to login first')
                return
            }
            await handleUserAddToCart(token, id)
            
            alert('Added product to cart successfully')
            updateCartQuantity()
        } catch (error) {
            console.error('Error add product to cart:', error)
        }
    }

    const handleAddToFavorite = () => {

    }

    if (loading) {
        return (
            <div className='container d-flex align-items-center justify-content-center'>
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </div>
        )
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className='row row-cols-1 row-cols-md-4 g-4'>
            {products.slice(0, 8).map(product => (
                <div key={product.ProductID} className='col'>
                    <div className='card h-100 product-box'>
                        <div className='product-image'>
                            <Link to={`/product/detail/${product.ProductID}`}>
                                <img src={`${process.env.PUBLIC_URL}${product.Image}`} className='card-img' alt={product.Name} />
                            </Link>
                            <span className='product-promo bg-red'>hot</span>
                            <div className='product-action'>
                                <Link className='i-cart' onClick={() => handleAddToCart(product.ProductID)}>
                                    <FontAwesomeIcon icon={faShoppingCart} className='mx-2' />
                                </Link>
                                <Link className='i-heart' onClick={handleAddToFavorite}>
                                    <FontAwesomeIcon icon={faHeart} className='mx-2' />
                                </Link>
                            </div>
                        </div>
                        <div className='product-content'>
                            <h3 className='product-title fw-bold'><Link to={`/product/detail/${product.ProductID}`}>{product.Name}</Link></h3>
                            <span className='product-price'>{product.Price.toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HotItem
