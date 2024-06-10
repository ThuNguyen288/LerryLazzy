import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Item from '../components/Item'
import NavBar from '../components/NavBar'
import './ProductPage.scss'

const categoryMap = {
    wool: 1,
    product: 2,
    material: 3,
    tool: 4
}

const subcategoryMap = {
    animal: 1,
    plant: 2,
    food: 3,
    cloth: 4,
    accessory: 5,
    mochi: 6,
    other: 7
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const ProductPage = () => {
    const { category, subcategory } = useParams()

    const categoryid = category ? categoryMap[category.toLowerCase()] : null
    const subcategoryid = subcategory ? subcategoryMap[subcategory.toLowerCase()] : null

    return (
        <div className='bg-1'>
            <NavBar />
            <nav className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <ol className='breadcrumb mb-0 fx-xs'>
                                    <li className='breadcrumb-item'><a className='breadcrumb-link bread-home' href='/'>Home</a></li>
                                    {subcategory ? (
                                        <>
                                            <li className='breadcrumb-item'><a className='breadcrumb-link' href='/product/product'>{capitalizeFirstLetter('product')}</a></li>
                                            <li className='breadcrumb-item active' aria-current='page'>{capitalizeFirstLetter(subcategory)}</li>
                                        </>
                                    ) : (
                                        category && <li className='breadcrumb-item active' aria-current='page'>{capitalizeFirstLetter(category)}</li>
                                    )}
                                </ol>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='container'>
                {categoryid && <Item categoryid={categoryid} />}
                {subcategoryid && <Item subcategoryid={subcategoryid} />}
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage
