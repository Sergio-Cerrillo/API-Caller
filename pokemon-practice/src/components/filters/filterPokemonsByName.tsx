import { Pokemon } from "../../types/types";

export const filterPokemonsByName = (poke: Pokemon[], nameFiltered: string, setPoke: (poke: Pokemon[]) => void, pokeGlobal: Pokemon[]) => {

    if (nameFiltered.length > 1) {
        const filtered = poke.filter((poke: any) =>
            poke.name.toLowerCase().includes(nameFiltered.toLowerCase())
        );
        setPoke(filtered)
    } else {
        if (nameFiltered.length < 1) {
            setPoke(pokeGlobal)
        }
    }
};