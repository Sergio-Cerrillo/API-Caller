import { getPokemonsByType } from "../../api/api";
import { Pokemon } from "../../types/types";

export const filterPokemonsByType = async (selectedType: string, setLoading: (loading: boolean) => void, itemsPerPage: number, setPoke: (poke: Pokemon[]) => void, setTotalPages: (pages: number) => void, setPokeGlobal: (poke: Pokemon[]) => void) => {
    setLoading(true);

    try {
        const { data, error } = await getPokemonsByType({ selectedType: selectedType, page: 1, limit: itemsPerPage })
        if (error) {
            console.log("Error al obtener pokemons filtrados:", error)
            setLoading(false)
            return
        }
        if (data && Array.isArray(data.pokemon)) {

            const transformedPokemons = data.pokemon.map((item: any) => ({
                name: item.pokemon.name,
                url: item.pokemon.url
            }))
            const limitedPokemons = transformedPokemons.slice(0, 70)
            setPoke(limitedPokemons)
            setPokeGlobal(limitedPokemons)
            setTotalPages(Math.ceil(data.pokemon.length / itemsPerPage));
            setLoading(false);

        }

    } catch (error) {
        console.error("Error en la filtració de pokemons:", error)
    } finally {
        setLoading(false)
    }




};