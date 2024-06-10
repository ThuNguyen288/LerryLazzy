import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Search.scss'

const Search = () => {
    
    return (
        <div className='search-box me-0'>
            <input type='search' placeholder='Search...' className='search-input'/>
            <button><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/></button>
        </div>
    )
}

export default Search