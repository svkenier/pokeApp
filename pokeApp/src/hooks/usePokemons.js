import { useState, useEffect } from "react";
import { getPokemons } from "../api/getPokemons";




export const usePokemons = () => {
  const [pokemonsList, setPokemonsList] = useState([]);
  
  



  

  const getPokemonData = async () => {
    try {
      const data = await getPokemons();
      setPokemonsList(data);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  useEffect(() => {
    getPokemonData();
}, []);






  return { pokemonsList};
};



