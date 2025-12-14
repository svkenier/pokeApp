import React from 'react'

import { useFindPokemon } from './useFindPokemon';

export const useShowInfoPokemon = () => {


const {pokemon, infoPokemon, typeData, speciesData, evolutionChainData, handleCardClick} = useFindPokemon();


const handleShowInfoPokemon = (pokemon) => {
   handleCardClick(pokemon)

}

  return (
    handleShowInfoPokemon
  )
}
