import { Box } from "@mui/material";
import { usePokemonContext } from "../context/PokemonContext";

export const Lights = () => {
  const { selectedPokemon, showStats } = usePokemonContext();

  // Determinar qué luz debe estar encendida
  // Sin pokemon seleccionado = lista (roja)
  // Con pokemon y sin stats = detalles (amarilla)
  // Con pokemon y con stats = estadísticas (verde)
  const isListView = !selectedPokemon;
  const isDetailsView = selectedPokemon && !showStats;
  const isStatsView = selectedPokemon && showStats;

  return (
    <Box  sx={{
       
        width: "45%",
        height: "100%",
        marginLeft:"10%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
  
    }}>

        <Box sx={{
            width:"52%",
            height:"63%",
            backgroundColor:"rgba(24, 105, 157, 0.8)",
            borderRadius:"50%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            border:"1.5px solid black",
         
        }} >

        <Box sx={{
            border:"solid 2.5px black",
            width:"50%",
            height:"50%",
            borderRadius:"50%",
           

        }} >

        </Box>

        </Box>

        {/* contenedor de 3 luces */}
        <Box sx={{
            height:"100%",

            display:"flex",
            gap: 1 ,
            paddingTop:"1.2rem"
        }} > 


        {/* Luz Roja - Lista de Pokémon */}
        <Box sx={{
            width:"1rem",
            height:"1rem",
            backgroundColor:"#fe0e36",
            border :"2px solid black",
            opacity: isListView ? 1 : 0.8,
            transition: "opacity 0.3s ease",
            boxShadow: isListView ? "0 0 12px 3px #fe0e36, 0 0 6px #fe0e36" : "none"
        }} ></Box>  

        {/* Luz Amarilla - Vista de Detalles */}
        <Box sx={{
            width:"1rem",
            height:"1rem",
            backgroundColor:"#fee019",
            border :"2px solid black",
            opacity: isDetailsView ? 1 : 0.8,
            transition: "opacity 0.3s ease",
            boxShadow: isDetailsView ? "0 0 12px 3px #fee019, 0 0 6px #fee019" : "none"
            
        }} ></Box>  

        {/* Luz Verde - Vista de Estadísticas */}
        <Box sx={{
            width:"1rem",
            height:"1rem",
            backgroundColor:"#5ab468",
            border :"2px solid black",
            opacity: isStatsView ? 1 : 0.8,
            transition: "opacity 0.3s ease",
            boxShadow: isStatsView ? "0 0 12px 3px #5ab468, 0 0 6px #5ab468" : "none"
            
        }} ></Box>  
      
        </Box>
    </Box>  
  )
}


