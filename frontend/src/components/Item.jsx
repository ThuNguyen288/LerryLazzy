import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { Link, useParams } from 'react-router-dom'

import { CartContext } from '../context/CartContext'
import { handleUserAddToCart } from '../services/cartService'
import { getProductsByCategory, getProductsBySubcategory } from '../services/productService'

import './Item.scss'


const Item = ({ categoryid, subcategoryid }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { updateCartQuantity } = useContext(CartContext)
    const { productid } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response
                if (categoryid) {
                    response = await getProductsByCategory(categoryid)
                } else if (subcategoryid) {
                    response = await getProductsBySubcategory(subcategoryid)
                } else return

                setProducts(response)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products: ', error)
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [categoryid, subcategoryid])

    // useEffect(() => {
    //     const fetchFavoriteStatus = async (productId) => {
    //         try {
    //             const token = localStorage.getItem('token')
    //             const favoriteStatus = await handleCheckFavorite(token, productId)
    //             return favoriteStatus.inFavo
    //         } catch (error) {
    //             console.error(`Error checking favorite status for product ${productId}:`, error)
    //             return false
    //         }
    //     }

    //     const updateProductsFavoriteStatus = async () => {
    //         try {
    //             const updatedProducts = await Promise.all(products.map(async (product) => {
    //                 const isFavorite = await fetchFavoriteStatus(product.ProductID)
    //                 return { ...product, isFavorite }
    //             }))
    //             setProducts(updatedProducts)
    //         } catch (error) {
    //             console.error('Error updating favorite status:', error)
    //         }
    //     }

    //     updateProductsFavoriteStatus()
    // }, [products])

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

    const handleToggleFavorite = async (productId) => {
        // try {
        //     const token = localStorage.getItem('token')
        //     if (!token) {
        //         console.error('Error: User not authenticated')
        //         return
        //     }
    
        //     // Update local state optimistically
        //     setProducts(prevProducts => {
        //         return prevProducts.map(product => {
        //             if (product.ProductID === productId) {
        //                 return { ...product, isFavorite: !product.isFavorite }
        //             }
        //             return product
        //         })
        //     })
    
        //     // Call backend to toggle favorite status
        //     await handleAddRemoveFavorite(token, productId)
            
        // } catch (error) {
        //     console.error('Error toggling favorite status:', error)
        // }
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
            {products.map(product => (
                <div key={product.ProductID} className='col'>
                    <div className='card h-100 product-box'>
                        <div className='product-image'>
                            <Link to={`/product/detail/${product.ProductID}`}>
                                <img src={`${process.env.PUBLIC_URL}${product.Image}`} className='card-img' alt={product.Name} />
                            </Link>
                            <div className='product-action'>
                                <Link className='i-cart' onClick={() => handleAddToCart(product.ProductID)}>
                                    <FontAwesomeIcon icon={faShoppingCart} className='mx-2' />
                                </Link>
                                <Link className='i-heart' onClick={handleToggleFavorite}>
                                    <FontAwesomeIcon icon={faHeart} className={`mx-2 ${product.isFavorite ? 'red' : 'gray'}`} />
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

export default Item
