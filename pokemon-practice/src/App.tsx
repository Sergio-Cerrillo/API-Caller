import React, { useEffect, useState } from 'react';
import './App.css';
import { Pokemon, PokemonDetails } from './types/types';
import SearchArea from './components/searchArea';
import Gallery from './components/gallery';
import ReactPaginate from 'react-paginate';
import PokemonTypeSelector from './components/pokemonTypeSelector';
import Modal from './components/modal';
import { obtainPokemons } from './components/obtainPokemons';
import { filterPokemonsByName } from './components/filters/filterPokemonsByName';
import { filterPokemonsByType } from './components/filters/filterPokemonsByType';
import { fetchPokemonDetails } from './components/pokemonDetails';
import { rePaginate } from './components/rePaginate';

const App = () => {
  const [poke, setPoke] = useState<Pokemon[]>([]);
  const [pokeGlobal, setPokeGlobal] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameFiltered, setNameFiltered] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('');

  const itemsPerPage = 70;

  useEffect(() => {
    obtainPokemons(setTotalPages, itemsPerPage, setLoading, setPoke, totalPages, setPokeGlobal);
  }, []);

  //filter by Name
  useEffect(() => {
    filterPokemonsByName(poke, nameFiltered, setPoke, pokeGlobal);
  }, [nameFiltered]);

  //filter by type
  useEffect(() => {
    if (selectedType) {
      filterPokemonsByType(selectedType, setLoading, itemsPerPage, setPoke, setTotalPages, setPokeGlobal);
    }
    if (!selectedType) {
      obtainPokemons(setTotalPages, itemsPerPage, setLoading, setPoke, totalPages, setPokeGlobal)
    }
  }, [selectedType]);

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
    <div className="App">
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
      </footer>
    </div>
  );
};

export default App;
