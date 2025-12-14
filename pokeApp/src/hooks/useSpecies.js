import { useState, useEffect } from "react";
import { getSpecies } from "../api/getSpecies";
import { usePokemons } from "./usePokemons";


export const useSpecies = () => {
const {allPokemons} = usePokemons();
    
  const [species, setSpecies] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState({});



  const handleMouseEnter = () => {

     setPokemonInfo({
   types: pokemon.types.map(typeInfo => typeInfo.type.name),
       // species: species.find(specie => specie.id === pokemon.id) 
     });
    
    }
    
    console.log(`info handleMouseEnter `, pokemonInfo);




useEffect(() => {
  const fetchSpecies = async () => {
        try {
            const speciesData = await Promise.all(
                allPokemons.map(pokemon => getSpecies(pokemon.species.url))
            );
            setSpecies(speciesData);
        } catch (error) {
            console.error('Error fetching species data:', error);
        }
    };
    fetchSpecies();
}, [allPokemons]);

// console.log(`all pokemons`, allPokemons);
console.log(`species`, species);
  console.log(`info usePokemons `, pokemonInfo);



  return { handleMouseEnter, pokemonInfo};
};



