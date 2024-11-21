import React from 'react'
interface GalleryProps {
    poke: any[]
    handlePokemonClick: (url: string) => void
    nameFiltered: string
}
const Gallery: React.FC<GalleryProps> = ({ poke, handlePokemonClick, nameFiltered }) => {
    return (
        <div className="gallery">
            {poke.length > 0 ? (
                poke.map((poke: any) => (
                    <div
                        key={poke.url}
                        className="card"
                        onClick={() => handlePokemonClick(poke.url)}
                    >
                        {poke.name.toUpperCase()}
                    </div>
                ))
            ) : (
                <p>No se encontraron resultados para "{nameFiltered}"</p>
            )}
        </div>
    )
}
export default Gallery