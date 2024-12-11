import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import type { Pokemon, PokemonDetails } from './types/types';
import SearchArea from './components/searchArea';
import Gallery from './components/gallery';
import ReactPaginate from 'react-paginate';
import PokemonTypeSelector from './components/pokemonTypeSelector';
import Modal from './components/modal';
import { fetchPokemonDetails } from './components/pokemonDetails';
import { rePaginate } from './components/rePaginate';
import { usePokemons } from './hooks/usePokemons';
import {ThemeContext} from './context/context'

export const itemsPerPage = 70;

const App = () => {
  
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  //context
  const context = useContext(ThemeContext)
  if(!context){
    throw new Error("error on ThemeContext")
  }
  const {theme, updateTheme} = context

  //custom hook
    const { poke, setPoke, totalPages, loading, setLoading, setPokeGlobal, setTotalPages, nameFiltered, setNameFiltered, setSelectedType} = usePokemons()

    //pagination
  const handlePageClick = (event: { selected: number }) => {
    rePaginate(itemsPerPage, setLoading, setPoke, currentPage)
    setCurrentPage(event.selected);
  };

  //pokemons details
  const handlePokemonClick = async (name: string) => {
    await fetchPokemonDetails(name, setSelectedPokemon, setIsModalOpen);
  };

  return (
    <div className={theme==="light"? "App-light":"App-dark"}>
      <div className="search-area">
        <SearchArea nameFiltered={nameFiltered} handleNameChange={(e) => setNameFiltered(e.target.value)} />
        <PokemonTypeSelector selectedType={setSelectedType} />
      </div>

      {loading ? (
        <h2>Cargando PokeLista...</h2>
      ) : (
        <div>
          <Gallery poke={poke} handlePokemonClick={handlePokemonClick} nameFiltered={nameFiltered} />
        </div>
      )}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} selectedPokemon={selectedPokemon} />

      <footer className="footer">
        <ReactPaginate
          className="paginate"
          breakLabel="..."
          nextLabel="Siguiente"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          previousLabel="Anterior"
          renderOnZeroPageCount={null}
          activeClassName="active"
          disabledClassName="disabled"
          previousClassName="previous"
          nextClassName="next"
        />
        <div>
          <h3 className='title-theme'>El tema es: {theme}</h3>
          
          <button type='button' className='button-theme' onClick={()=> updateTheme(theme === "light" ? "dark":"light")}>Cambiar Tema</button>
        </div>
        
      </footer>
    </div>
  );
};

export default App;