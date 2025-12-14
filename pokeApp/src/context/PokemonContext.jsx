import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { getPokemonsType } from '../api/getPkemonsType';
import { getEvolutionChain } from '../api/getEvolutionChain';
import { getSpecies } from '../api/getSpecies';
import { getUniquePokemon } from '../api/getUniquePokemon';

const PokemonContext = createContext();

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState({});
  const [infoPokemon, setInfoPokemon] = useState({});
  const [typeData, setTypeData] = useState([]);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionChainData, setEvolutionChainData] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const pokemonListRef = useRef(null);
  const isSelectedRef = useRef(false);

  const { allPokemons } = usePokemonDetails();

  // Helper function to process type data and update weaknesses
  const processTypeData = (data) => {
    const weaknessesSet = new Set();
    data.forEach(typeInfo => {
      if (typeInfo.damage_relations && typeInfo.damage_relations.double_damage_from) {
        typeInfo.damage_relations.double_damage_from.forEach(weakness => {
          weaknessesSet.add(weakness.name);
        });
      }
    });
    setInfoPokemon(prev => ({ ...prev, weaknesses: Array.from(weaknessesSet) }));
  };

  // Helper function to process species data and update description
  const processSpeciesData = (species) => {
    if (species.flavor_text_entries && species.flavor_text_entries.length > 0) {
      let entry = species.flavor_text_entries.find(e => e.language.name === 'es');
      if (!entry) entry = species.flavor_text_entries.find(e => e.language.name === 'en');
      if (!entry) entry = species.flavor_text_entries[0];

      if (entry && entry.flavor_text) {
        const cleanDescription = entry.flavor_text
          .replace(/\n/g, ' ')
          .replace(/\f/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        setInfoPokemon(prev => ({ ...prev, description: cleanDescription }));
      }
    }
  };

  // Fetch evolution chain when species data is available
  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (speciesData && speciesData.evolution_chain) {
        try {
          // Check if url is correct
          const url = speciesData.evolution_chain.url;
          if(url) {
             const evolutionChain = await getEvolutionChain(url);
             setEvolutionChainData(evolutionChain);
          }
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

          const extractEvolutions = (chain) => {
            if (chain.species) {
              evolutions.push(chain.species.name);
            }
            if (chain.evolves_to && chain.evolves_to.length > 0) {
              chain.evolves_to.forEach(evolution => extractEvolutions(evolution));
            }
          };

          extractEvolutions(evolutionChainData.chain);

          const evolutionDetailsPromises = evolutions.map(async (evolutionName) => {
            try {
              const pokemonData = await getUniquePokemon(evolutionName);

              const types = pokemonData.types.map(typeInfo => typeInfo.type.name);

              return {
                types: types,
                height: pokemonData.height,
                weight: pokemonData.weight,
                name: pokemonData.name,
                id: pokemonData.id,
                sprites: pokemonData.sprites.other.dream_world.front_default,
                species: pokemonData.species.url,
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


  const handleMouseOver = async (pokemonid) => {
    const foundPokemon = allPokemons.find(pokemon => pokemon.id === pokemonid);
    if (!foundPokemon) return;
    
    setPokemon(foundPokemon);
    
    const initialInfo = {
      types: foundPokemon.types.map(typeInfo => typeInfo.type.name),
      height: foundPokemon.height,
      weight: foundPokemon.weight,
      name: foundPokemon.name,
      id: foundPokemon.id,
      sprites: foundPokemon.sprites.other.dream_world.front_default,
      species: foundPokemon.species.url,
    };
    setInfoPokemon(initialInfo);

    const promises = [];

    if (initialInfo.types.length > 0) {
        const typePromise = Promise.all(initialInfo.types.map(type => getPokemonsType(type)))
            .then(data => {
                setTypeData(data);
                processTypeData(data);
            })
            .catch(e => console.error("Error fetching types:", e));
        promises.push(typePromise);
    }

    if (initialInfo.species) {
        const speciesPromise = getSpecies(initialInfo.species)
            .then(data => {
                setSpeciesData(data);
                processSpeciesData(data);
            })
            .catch(e => console.error("Error fetching species:", e));
        promises.push(speciesPromise);
    }

    await Promise.all(promises);
  };

  const handleMouseLeave = () => {
    if (isSelectedRef.current) return;
    setPokemon({});
    setInfoPokemon({});
    setTypeData([]);
    setSpeciesData(null);
    setEvolutionChainData(null);
  };

  const scrollToTop = () => {
    if (pokemonListRef.current) {
      pokemonListRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handlePokemonClick = (pokemonid) => {
    isSelectedRef.current = true;
    const foundPokemon = allPokemons.find(pokemon => pokemon.id === pokemonid);
    setSelectedPokemon(foundPokemon);
    setShowStats(false); // Reset to normal view on new selection
    handleMouseOver(pokemonid);
  };

  const clearSelectedPokemon = () => {
    isSelectedRef.current = false;
    setSelectedPokemon(null);
    setShowStats(false); // Reset stats view
    setPokemon({});
    setInfoPokemon({});
    setTypeData([]);
    setSpeciesData(null);
    setEvolutionChainData(null);
  };

  const toggleStats = () => {
    setShowStats(prev => !prev);
  };

  const navigatePokemon = (direction) => {
    if (!selectedPokemon || allPokemons.length === 0) return;
    
    // Find index of current pokemon in the sorted list
    const currentIndex = allPokemons.findIndex(p => p.id === selectedPokemon.id);
    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;
    
    // Wrap around logic
    if (newIndex < 0) newIndex = allPokemons.length - 1;
    if (newIndex >= allPokemons.length) newIndex = 0;

    const nextPokemon = allPokemons[newIndex];
    setSelectedPokemon(nextPokemon);
    handleMouseOver(nextPokemon.id);
  };

  const selectRandomPokemon = () => {
    if (allPokemons.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    const randomPokemon = allPokemons[randomIndex];
    setSelectedPokemon(randomPokemon);
    handleMouseOver(randomPokemon.id);
    setShowStats(false); // Ensure we show details view
  };

  const searchPokemon = (query) => {
      if (!query) return;
      const normalizedQuery = query.toString().toLowerCase().trim();
      
      const found = allPokemons.find(p => 
          p.name.toLowerCase() === normalizedQuery || 
          p.id.toString() === normalizedQuery
      );

      if (found) {
          setSelectedPokemon(found);
          handleMouseOver(found.id);
          setShowStats(false);
          return true; // Return success
      }
      return false; // Return failure
  };

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (mode) => setDarkMode(mode);

  const [selectedType, setSelectedType] = useState(null);

  const filterByType = (type) => {
      setSelectedType(prevType => prevType === type ? null : type);
  };

  const filteredPokemons = selectedType 
      ? allPokemons.filter(p => p.types.some(t => t.type.name === selectedType))
      : allPokemons;

  // Scroll logic for d-pad
  const handleScrollUp = () => {
    if (pokemonListRef.current) {
      const scrollAmount = pokemonListRef.current.clientHeight;
      pokemonListRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    if (pokemonListRef.current) {
      const scrollAmount = pokemonListRef.current.clientHeight;
      pokemonListRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  // Screen navigation logic (Left/Right D-pad)
  const handleScreenNext = () => {
    // Current state logic:
    // List -> Details -> Stats -> List
    
    if (!selectedPokemon) {
      // From List to Details (select first available)
      if (filteredPokemons && filteredPokemons.length > 0) {
        handlePokemonClick(filteredPokemons[0].id);
      }
    } else if (!showStats) {
      // From Details to Stats
      setShowStats(true);
    } else {
      // From Stats to List
      clearSelectedPokemon();
    }
  };

  const handleScreenPrev = () => {
    // List -> Stats (select first available) -> Details -> List
    
    if (!selectedPokemon) {
      // From List to Stats (via Details logic)
      if (filteredPokemons && filteredPokemons.length > 0) {
        const first = filteredPokemons[0];
        // We manually set state to simulate jumping to stats
        isSelectedRef.current = true;
        setSelectedPokemon(first);
        handleMouseOver(first.id);
        setShowStats(true);
      }
    } else if (showStats) {
      // From Stats to Details
      setShowStats(false);
    } else {
      // From Details to List
      clearSelectedPokemon();
    }
  };

  const value = {
    pokemon,
    infoPokemon,
    typeData,
    speciesData,
    evolutionChainData,
    handleMouseOver,
    handleMouseLeave,
    pokemonListRef,
    scrollToTop,
    selectedPokemon,
    handlePokemonClick,
    clearSelectedPokemon,
    showStats,
    toggleStats,
    navigatePokemon,
    selectRandomPokemon,
    searchPokemon,
    darkMode,
    toggleDarkMode,
    filterByType,
    selectedType,
    filteredPokemons,
    handleScrollUp,
    handleScrollDown,
    handleScreenNext,
    handleScreenPrev
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};
