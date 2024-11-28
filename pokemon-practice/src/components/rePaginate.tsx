import { getPokemons } from "../api/api";
import { Pokemon } from "../types/types";


export const rePaginate = async (itemsPerPage: number, setLoading: (loading: boolean) => void, setPoke: (poke: Pokemon[]) => void, currentPage: number) => {
    setLoading(true);

    try {
        const { data, error } = await getPokemons({ limit: itemsPerPage, page: currentPage })
        if (error) {
            console.log("Error al obtener pokemons:", error)
            setLoading(false)
            return
        }
        if (data) {
            setPoke(data.results);
            setLoading(false);
        }

    } catch (error) {
        console.error("Error en la obtención de pokemons:", error)
    } finally {
        setLoading(false)
    }

};