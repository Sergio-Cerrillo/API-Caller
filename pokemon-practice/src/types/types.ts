export interface Api<T>{
    data:T | null
    error:string|null
  }
export interface Pokemon{
    name:string
    url:string
}

export interface PokemonDetails{
    name:string
    sprites:{
        front_default:string        
    }
    height:number
    weight:number
    abilities:{
        ability:{name:string}
    }[]
}
export interface Type{
    name:string
    url:string
}
export interface GetPokemonsByType {
    damage_relations:[]
    no_damage_from:[]
    no_damage_to:[]
    game_indices:[]
    generation:{
      name:string
      url:string
    }
    move_damage_class:{
      name:string
      url:string
    }
    moves:[]
    name:string
    names:[]
    past_damage_relations:[]
    pokemon:Pokemon[]
    sprites:{}
  
  }
  export interface GetPokemonsTypes{
    count:number
    next:string|null
    previous:string|null
    results:Type[]
  }
  export interface GetPokemonsRes {
    count:number
    next:string|null
    previous:string|null
    results:Pokemon[]
  }