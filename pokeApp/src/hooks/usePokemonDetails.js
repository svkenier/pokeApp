import { useState, useEffect } from "react";
import { getUniquePokemon } from "../api/getUniquePokemon";
import { usePokemons } from "./usePokemons";


export const usePokemonDetails = () => {
  const { pokemonsList } = usePokemons();

  const [allPokemons, setAllPokemons] = useState([]);

 const handleAllPokemons = (pokemonsList) => {
    setAllPokemons(pokemonsList);
  }


  

useEffect(() => {
  const fetchAllPokemonDetails = async () => {
    if (pokemonsList.length === 0) return;
    
    try {
      const pokemonDetails = await Promise.all(
        pokemonsList.map(pokemon => getUniquePokemon(pokemon.name))
      );
      
      // Ordenar por ID
      const sortedPokemons = pokemonDetails.sort((a, b) => a.id - b.id);
      handleAllPokemons(sortedPokemons);
      
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  };
  
  fetchAllPokemonDetails();
}, [pokemonsList]);

console.log("allPokemons",allPokemons)



  return { allPokemons };
};


