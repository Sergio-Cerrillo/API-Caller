import React from 'react'
interface SearchAreaProps {
    nameFiltered: string;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const SearchArea: React.FC<SearchAreaProps> = ({ nameFiltered, handleNameChange }) => {
    return (
        <>
            <img className='header-logo' src='/images/pokeball2.0.png' alt='pokeball'></img>
            <input
                type="text"
                className="search-input"
                value={nameFiltered}
                placeholder="Buscar Pokemon..."
                onChange={handleNameChange}
            />
        </>
    )
}
export default SearchArea