import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Search.scss'

const Search = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('')

    const handleSearch = () => {
        onSearch(keyword)
    }
    
    return (
        <div className='search-box me-0'>
            <input type='text' value={keyword} placeholder='Search...' className='search-input' onChange={(event) => setKeyword(event.target.value)}/>
            <button type='submit' onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/></button>
        </div>
    )
}

export default Search