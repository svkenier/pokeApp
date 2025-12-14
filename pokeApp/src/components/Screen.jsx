import { Box } from '@mui/material'
import { ScreenPokemonsList } from '../views/ScreenPokemonsList.jsx'
import { PokemonDetailView } from './PokemonDetailView.jsx'
import { PokemonStatsView } from './PokemonStatsView.jsx'
import { usePokemonContext } from '../context/PokemonContext.jsx'

export const Screen = () => {
  const { selectedPokemon, showStats } = usePokemonContext();

  return (
    // contenedor de pantalla
    <Box sx={{ height: "70%", width: "95%", display: "flex", flexDirection: "column",  alignItems:"center", backgroundColor:"DarkGray" }} >

        {/* contenedor de adornos de la parte superior de la pantalla */}
        <Box sx={{ width: "20%", height: "6%", display:"flex", justifyContent:"center", alignItems:"center",gap:"1rem"}} >

            {/* adornos superior 1 */}
            <Box sx={{border:"solid black 1.5px", width:"0.6rem", height:"0.6rem", backgroundColor:"gray", transform:"rotate(45deg)"}}></Box>

            {/* adornos superior 2 */}
            <Box sx={{border:"solid black 1.5px", width:"0.6rem", height:"0.6rem", backgroundColor:"gray", transform:"rotate(45deg)"}}></Box>
        </Box>

        {/* pantalla */}    
        <Box sx={{ width: "95%", height: "74%", backgroundColor:"black", overflow: "hidden" }} >
            {selectedPokemon ? (
                showStats ? 
                <PokemonStatsView pokemon={selectedPokemon} /> 
                : <PokemonDetailView pokemon={selectedPokemon} />
            ) : <ScreenPokemonsList />}
        </Box>

        {/* contenedor de luz y altavoces */}
        <Box sx={{  width:"100%",height:"20%", display:"flex",justifyContent:"space-between",alignItems:"center", paddingX:"4rem" }} >

            {/* luz roja */}
            <Box sx={{border:"solid black 1px", width:"0.6rem", height:"0.6rem", backgroundColor:"#fe0e36", transform:"rotate(45deg)"}}></Box>
            
            {/* altavoces */}
            <Box sx={{
                width:"20%",
                height:"60%",
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
            }}>
                {/* ranura de altavoces 1*/}
                <Box sx={{ width:"90%", height:"10%", backgroundColor:"grey", border :"1.5px solid black" }} ></Box>
                {/* ranura de altavoces 2*/}
                <Box sx={{ width:"90%", height:"10%", backgroundColor:"grey", border :"1.5px solid black" }} ></Box>
                {/* ranura de altavoces 3*/}
                <Box sx={{ width:"90%", height:"10%", backgroundColor:"grey", border :"1.5px solid black" }} ></Box>
                {/* ranura de altavoces 4*/}
                <Box sx={{ width:"90%", height:"10%", backgroundColor:"grey", border :"1.5px solid black" }} ></Box>
            </Box>

        </Box>
    </Box>
  )
}
