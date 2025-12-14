import { useState, useEffect } from 'react'
import { usePokemonDetails } from './usePokemonDetails';
import { getPokemonsType } from '../api/getPkemonsType';
import { getEvolutionChain } from '../api/getEvolutionChain';
import { getSpecies } from '../api/getSpecies';
import { getUniquePokemon } from '../api/getUniquePokemon';

export const useFindPokemon = () => {

    const [pokemon, setPokemon] = useState({});
    const [infoPokemon, setInfoPokemon] = useState({});
    const [typeData, setTypeData] = useState([]);
    const [speciesData, setSpeciesData] = useState(null);
    const [evolutionChainData, setEvolutionChainData] = useState(null);

const {allPokemons} = usePokemonDetails();

const findInfoPokemon = (selectedPokemon) => {
 setInfoPokemon({
  types: selectedPokemon.types.map(typeInfo => typeInfo.type.name),
  height: selectedPokemon.height,
  weight: selectedPokemon.weight,
  name: selectedPokemon.name,
  id: selectedPokemon.id,
  sprites: selectedPokemon.sprites.other.dream_world.front_default,
  species: selectedPokemon.species.url,
 })
}

 const getTypeData = async (types) => {
    try {
      // Fetch data for each type
      const typePromises = types.map(type => getPokemonsType(type));
      const data = await Promise.all(typePromises);
      setTypeData(data);
    } catch (error) {
      console.error("Error fetching type data:", error);
    }
  };

  useEffect(() => {
    if (infoPokemon.types && infoPokemon.types.length > 0) {
      getTypeData(infoPokemon.types);
    }
}, [infoPokemon.types]);

  // Extract weaknesses from typeData and update infoPokemon
  useEffect(() => {
    if (typeData && typeData.length > 0) {
      const weaknessesSet = new Set();
      
      typeData.forEach(typeInfo => {
        if (typeInfo.damage_relations && typeInfo.damage_relations.double_damage_from) {
          typeInfo.damage_relations.double_damage_from.forEach(weakness => {
            weaknessesSet.add(weakness.name);
          });
        }
      });
      
      const weaknessesArray = Array.from(weaknessesSet);
      
      setInfoPokemon(prev => ({
        ...prev,
        weaknesses: weaknessesArray
      }));
    }
  }, [typeData]);

  // Fetch species data when infoPokemon.species changes
  useEffect(() => {
    const fetchSpeciesData = async () => {
      if (infoPokemon.species) {
        try {
          const species = await getSpecies(infoPokemon.species);
          setSpeciesData(species);
          
          // Extract Spanish description from flavor_text_entries
          if (species.flavor_text_entries) {
            const spanishEntry = species.flavor_text_entries.find(
              entry => entry.language.name === 'es'
            );
            
            if (spanishEntry) {
              // Clean up the text (remove line breaks and extra spaces)
              const cleanDescription = spanishEntry.flavor_text
                .replace(/\n/g, ' ')
                .replace(/\f/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              
              setInfoPokemon(prev => ({
                ...prev,
                description: cleanDescription
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching species data:", error);
        }
      }
    };
    fetchSpeciesData();
  }, [infoPokemon.species]);

  // Fetch evolution chain when species data is available
  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (speciesData && speciesData.evolution_chain) {
        try {
          const evolutionChain = await getEvolutionChain(speciesData.evolution_chain.url);
          setEvolutionChainData(evolutionChain);
        } catch (error) {
          console.error("Error fetching evolution chain:", error);
        }
      }
    };
    fetchEvolutionChain();
  }, [speciesData]);

  // Process evolution chain and update infoPokemon
  useEffect(() => {
    const processEvolutionChain = async () => {
      if (evolutionChainData && evolutionChainData.chain) {
        try {
          const evolutions = [];
          
          // Recursive function to extract all evolutions from the chain
          const extractEvolutions = (chain) => {
            if (chain.species) {
              evolutions.push(chain.species.name);
            }
            if (chain.evolves_to && chain.evolves_to.length > 0) {
              chain.evolves_to.forEach(evolution => extractEvolutions(evolution));
            }
          };
          
          extractEvolutions(evolutionChainData.chain);
          
          // Fetch detailed data for each evolution
          const evolutionDetailsPromises = evolutions.map(async (evolutionName) => {
            try {
              const pokemonData = await getUniquePokemon(evolutionName);
              
              // Get type data for this evolution
              const types = pokemonData.types.map(typeInfo => typeInfo.type.name);
              const typePromises = types.map(type => getPokemonsType(type));
              const typeDataArray = await Promise.all(typePromises);
              
              // Extract weaknesses for this evolution
              const weaknessesSet = new Set();
              typeDataArray.forEach(typeInfo => {
                if (typeInfo.damage_relations && typeInfo.damage_relations.double_damage_from) {
                  typeInfo.damage_relations.double_damage_from.forEach(weakness => {
                    weaknessesSet.add(weakness.name);
                  });
                }
              });
              
              return {
                types: types,
                height: pokemonData.height,
                weight: pokemonData.weight,
                name: pokemonData.name,
                id: pokemonData.id,
                sprites: pokemonData.sprites.other.dream_world.front_default,
                species: pokemonData.species.url,
                weaknesses: Array.from(weaknessesSet)
              };
            } catch (error) {
              console.error(`Error fetching evolution ${evolutionName}:`, error);
              return null;
            }
          });
          
          const evolutionDetails = await Promise.all(evolutionDetailsPromises);
          const validEvolutions = evolutionDetails.filter(evo => evo !== null);
          
          setInfoPokemon(prev => ({
            ...prev,
            evolutions: validEvolutions
          }));
        } catch (error) {
          console.error("Error processing evolution chain:", error);
        }
      }
    };
    
    processEvolutionChain();
  }, [evolutionChainData]);


    const handleMouseOver = (pokemonid) => {
        const foundPokemon = allPokemons.find(pokemon => pokemon.id === pokemonid)
        setPokemon(foundPokemon)
        findInfoPokemon(foundPokemon)

      };

      

      console.log(`infoPokemon`, infoPokemon)
      console.log(`pokemon encontrado`, pokemon)
      console.log(`typeData`, typeData)
  return {handleMouseOver, pokemon, infoPokemon, typeData}
}
