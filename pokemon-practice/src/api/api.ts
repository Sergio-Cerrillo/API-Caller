import { PokemonDetails, GetPokemonsByType, GetPokemonsTypes, GetPokemonsRes, Api } from "../types/types"

export const fetchPokeFromApi = async <T>(url:string):Promise<Api<T>> => {
    try {
        const response:Response = await fetch(`${process.env.REACT_APP_POKE_API_URL}${url}`)
        const data = await response.json()
        return {data, error:null} 
    } catch (err) {
        return {data:null, error:err as string}
    }
}


export const getPokemons = async ({ limit = 20, page = 1 }: { limit?: number; page?: number }) => {
    const offset = (page - 1) * limit;
    const url= `pokemon?limit=${limit}&offset=${offset}`
    const res= await fetchPokeFromApi<GetPokemonsRes>(url)
      return res;
    
  };

 
export const getPokemonsTypes = async ({ limit = 20, page = 1 }: { limit?: number; page?: number }) => {
    const offset = (page - 1) * limit;
    const url= `type?limit=${limit}&offset=${offset}`
    const res=fetchPokeFromApi<GetPokemonsTypes>(url)
      return res;
  
};


export const getPokemonsByType = async ({selectedType="", page=1, limit=20}:{selectedType:string; page:number; limit:number }) =>{
    const offset = (page -1) * limit
    const url= `type/${selectedType}?limit=${limit}&offset=${offset}`
    const res=fetchPokeFromApi<GetPokemonsByType>(url)
      return res
}


export const getPokemonsDetails = async ({name=""}:{name:string})=>{
    const url=`pokemon/${name}`
    const res = fetchPokeFromApi<PokemonDetails>(url)
      return res
  
}