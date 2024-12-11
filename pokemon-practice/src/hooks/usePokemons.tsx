 import { useState, useEffect } from "react";
import { obtainPokemons } from "../components/obtainPokemons";

import type { Pokemon } from "../types/types";
import { itemsPerPage } from "../App";
import { filterPokemonsByName } from "../components/filters/filterPokemonsByName";
import { filterPokemonsByType } from "../components/filters/filterPokemonsByType";
 
 export const usePokemons = () =>{

      const [poke, setPoke] = useState<Pokemon[]>([]);
      const [pokeGlobal, setPokeGlobal] = useState<Pokemon[]>([]);
      const [totalPages, setTotalPages] = useState<number>(0);
      const [loading, setLoading] = useState<boolean>(true);
      const [selectedType, setSelectedType] = useState<string>('');
      const [nameFiltered, setNameFiltered] = useState<string>('');
    
        useEffect(() => {
        obtainPokemons(setTotalPages, itemsPerPage, setLoading, setPoke, totalPages, setPokeGlobal);
        }, [])     

        useEffect(() => {
        filterPokemonsByName(poke, nameFiltered, setPoke, pokeGlobal);
        }, [nameFiltered]);

        useEffect(() => {
        if (selectedType) {
          filterPokemonsByType(selectedType, setLoading, itemsPerPage, setPoke, setTotalPages, setPokeGlobal);
        }
        if (!selectedType) {
          obtainPokemons(setTotalPages, itemsPerPage, setLoading, setPoke, totalPages, setPokeGlobal)
        }
      }, [selectedType]);
    
        return {poke, setPoke, nameFiltered, setNameFiltered, setSelectedType, totalPages, loading, setLoading, pokeGlobal,setPokeGlobal, setTotalPages}
      }