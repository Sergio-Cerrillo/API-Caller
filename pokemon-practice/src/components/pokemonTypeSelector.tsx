import React, { useState, useEffect } from 'react';
import { getPokemonsTypes } from '../api/api';

const PokemonTypeSelector = ({ selectedType }: { selectedType: (type: string) => void }) => {
    const [types, setTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const { data, error } = await getPokemonsTypes({})
                if (error) {
                    console.log("Error al obtener los tipos", error)
                }
                if (data) {
                    setTypes(data.results.map((type: { name: string }) => type.name));
                }
            } catch (error) {
                console.error("Error en la obtención de tipos:", error)
            } finally {
                setLoading(false)
            }


        };

        fetchTypes();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Cargando tipos de Pokémon...</p>
            ) : (
                <select onChange={(e) => selectedType(e.target.value)}>
                    <option value="">Selecciona un tipo</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default PokemonTypeSelector;
