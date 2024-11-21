import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import { fetchPokeFromApi } from './api/api';
import SearchArea from './components/searchArea';
import Gallery from './components/gallery'
import RenderPaginationButtons from './components/renderPaginationButtons';
import { Pokemon, PokemonDetails } from './types/types'

Modal.setAppElement('#root');

function App() {
  const [poke, setPoke] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameFiltered, setNameFiltered] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const obtainPokemons = async (page: number) => {
    const limit = 70;
    const offset = (page - 1) * limit;

    const url = `${process.env.REACT_APP_TOTAL_POKE_API_URL}?limit=${limit}&offset=${offset}`;

    try {
      const response = await fetchPokeFromApi(url);

      let pokemons = response.results;


      if (nameFiltered.length > 0) {
        pokemons = pokemons.filter((poke: any) => poke.name.toLowerCase().includes(nameFiltered.toLowerCase()));
      }

      setPoke(pokemons);
      setTotalPages(Math.ceil(response.count / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //changes on filter
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFiltered(e.target.value);
    setCurrentPage(1);
  };


  useEffect(() => {
    setLoading(true);
    obtainPokemons(currentPage);
  }, [currentPage, nameFiltered]);

  //change page function
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //pokemon selected
  const handlePokemonClick = async (url: string) => {
    try {
      const response = await fetchPokeFromApi(url);
      setSelectedPokemon(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles del Pokémon:', error);
    }
  };



  return (
    <div className="App">
      <SearchArea nameFiltered={nameFiltered} handleNameChange={handleNameChange} />
      {loading ? (
        <h2>Cargando PokeLista...</h2>
      ) : (
        <Gallery poke={poke} handlePokemonClick={handlePokemonClick} nameFiltered={nameFiltered} />
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="pokemon details"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedPokemon && (
          <div>
            <h1>{selectedPokemon.name.toUpperCase()}</h1>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} className='pic-pokemon' />
            <p>Altura: {selectedPokemon.height}</p>
            <p>Peso: {selectedPokemon.weight}</p>
            <h3>Habilidades:</h3>
            <ul>
              {selectedPokemon.abilities.map((ability: any, index: number) => (
                <li className='habilities' key={index}>{ability.ability.name}</li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
          </div>
        )}
      </Modal>

      <footer className="footer">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <RenderPaginationButtons totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </footer>
    </div>
  );
}

export default App;
