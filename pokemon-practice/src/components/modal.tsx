import React from 'react'
import ReactModal from 'react-modal'
import { PokemonDetails } from '../types/types'

interface ModalProps {
    isOpen: boolean
    onRequestClose: () => void
    selectedPokemon: PokemonDetails | null
}
const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, selectedPokemon }) => {
    if (!selectedPokemon) return null
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="pokemon details"
            className="modal-content"
            overlayClassName="modal-overlay"
        >

            <div>
                <h1>{selectedPokemon.name.toUpperCase()}</h1>
                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} className="pic-pokemon" />
                <p>Altura: {selectedPokemon.height}</p>
                <p>Peso: {selectedPokemon.weight}</p>
                <h3>Habilidades:</h3>
                <ul>
                    {selectedPokemon.abilities.map((ability: any, index: number) => (
                        <li className="habilities" key={index}>{ability.ability.name}</li>
                    ))}
                </ul>
                <button onClick={onRequestClose}>Cerrar</button>
            </div>

        </ReactModal>
    )
}
export default Modal