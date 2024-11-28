import { getPokemons } from "../api/api";
import { Pokemon } from "../types/types";


export const obtainPokemons = async (setTotalPages: (pages: number) => void, itemsPerPage: number, setLoading: (loading: boolean) => void, setPoke: (poke: Pokemon[]) => void, totalPages: number, setPokeGlobal: (poke: Pokemon[]) => void) => {
    setLoading(true);

    try {
        const { data, error } = await getPokemons({ limit: itemsPerPage })
        if (error) {
            console.log("Error al obtener pokemons:", error)
            setLoading(false)
            return
        }
        if (data) {
            setPoke(data.results);
            setPokeGlobal(data.results)
            const totalP = (Math.ceil(data.count / itemsPerPage))
            setTotalPages(totalP)

            setLoading(false);
        }

    } catch (error) {
        console.error("Error en la obtención de pokemons:", error)
    } finally {
        setLoading(false)
    }




};