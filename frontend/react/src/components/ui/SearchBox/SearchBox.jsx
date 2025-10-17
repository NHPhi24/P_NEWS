import React, {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import './SearchBox.scss';

const SearchBox = ({
    placeholder = "Tìm kiếm", 
    onSearch,
    delay =300
}) => {
    
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm)
        }, delay);

        return () => clearTimeout(timer);
    }, [searchTerm, delay, onSearch])

    return (
        <div className="search-box">
            <FaSearch className="search-box__icon"/>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-box__input"
            />
        </div>
    )
}

export default SearchBox;