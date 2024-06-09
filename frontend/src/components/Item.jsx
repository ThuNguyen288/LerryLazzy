import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import { Link, useParams } from 'react-router-dom'

import { handleUserAddToCart } from '../services/cartService'
import { getProductsByCategory, getProductsBySubcategory } from '../services/productService'

import './Item.scss'

const Item = ({ categoryid, subcategoryid }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { productid } = useParams()
    
    console.log(productid)

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
            const response = await handleUserAddToCart(token, id)
            console.log(response)
            
            alert('Added product to cart successfully')
        } catch (error) {
            console.error('Error add product to cart:', error)
        }
    }

    const handleAddToFavorite = () => {

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
                                <Link onClick={() => handleAddToCart(product.ProductID)}>
                                    <FontAwesomeIcon icon={faShoppingCart} className='mx-2' />
                                </Link>
                                <Link onClick={handleAddToFavorite}>
                                    <FontAwesomeIcon icon={faHeart} className='mx-2' />
                                </Link>
                            </div>
                        </div>
                        <div className='product-content'>
                            <h3 className='product-title fw-bold'><Link to={`/product/detail/${product.ProductID}`}>{product.Name}</Link></h3>
                            <span className='product-price'>{product.Price} đ</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Item
