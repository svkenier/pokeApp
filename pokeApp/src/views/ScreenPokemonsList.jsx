import { Box } from '@mui/material'
import React from 'react'
import { CardPokemon } from '../components/cardPokemon'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { usePokemonContext } from '../context/PokemonContext'

export const ScreenPokemonsList = () => {
  // allPokemons removed from here, now using context
  const { handleMouseOver, handleMouseLeave, pokemonListRef, filteredPokemons } = usePokemonContext(); 

 

  return (
    <Box ref={pokemonListRef} sx={{backgroundColor:"#5382e9ff", height:"100%", width:"100% ", color:"white", display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem", flexWrap:"wrap", overflow:"auto" }} >

      {filteredPokemons && filteredPokemons.map( (pokemon) => <CardPokemon key={pokemon.id} pokemon={pokemon} handleMouseOver={handleMouseOver} handleMouseLeave={handleMouseLeave} /> ) }
    </Box>  
  )
}
