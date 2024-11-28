import { getPokemonsDetails } from "../api/api";
import { PokemonDetails } from "../types/types";

export const fetchPokemonDetails = async (name: string, setSelectedPokemon: (pokemon: PokemonDetails | null) => void, setIsModalOpen: (isOpen: boolean) => void) => {
    try {
        const { data, error } = await getPokemonsDetails({ name })
        if (error) {
            console.log("Error al obtener los detalles del pokemon:", error)
        }
        if (data) {
            setSelectedPokemon(data);
            setIsModalOpen(true);
        }

    } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
    }
};