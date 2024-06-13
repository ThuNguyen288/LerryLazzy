import React, { useState } from 'react'

import Banner from '../components/Banner'
import Footer from '../components/Footer'
import HotItem from '../components/HotItem'
import NavBar from '../components/NavBar'
import NewItem from '../components/NewItem'

import './HomePage.scss'

const HomePage = () => {

    const [activeTab, setActiveTab] = useState('bestSellers')

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <NavBar/>
            <Banner/>
            <div className='container my-5 pt-5 px-5'>
                <div className='row gutter-1 align-items-end mb-4'>
                    <div className='col-md-6'>
                        <h2 className='hero-heading'>Featured Products</h2>
                    </div>
                    <div className='col-md-6 text-end'>
                        <ul className='nav nav-tabs lavalamp' id='myTab' role='tablist'>
                            <div className='lavalamp-object ease' style={{ left: activeTab === 'bestSellers' ? '16.5px' : '165.5px' }}></div>
                            <li className='nav-item lavalamp-item' style={{zIndex: '5', position: 'relative'}}>
                                <button
                                    className={`nav-link text-uppercase ${activeTab === 'bestSellers' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('bestSellers')}
                                    role='tab'
                                    aria-selected={activeTab === 'bestSellers'}
                                >
                                    Best Sellers
                                </button>
                            </li>
                            <li className='nav-item lavalamp-item' style={{zIndex: '5', position: 'relative'}}>
                                <button
                                    className={`nav-link text-uppercase ${activeTab === 'newArrivals' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('newArrivals')}
                                    role='tab'
                                    aria-selected={activeTab === 'newArrivals'}
                                >
                                    New Arrivals
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='tab-content' id='myTabContent'>
                            <div className={`tab-pane fade ${activeTab === 'bestSellers' ? 'show active' : ''}`} id='home' role='tabpanel'>
                                <HotItem />
                            </div>
                            <div className={`tab-pane fade ${activeTab === 'newArrivals' ? 'show active' : ''}`}>
                                <NewItem />
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <Footer/>
        </div>
    )
}

export default HomePage