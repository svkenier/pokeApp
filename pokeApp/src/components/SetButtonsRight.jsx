import { Box, Typography } from '@mui/material'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { usePokemonContext } from '../context/PokemonContext';

  export const SetButtonsRight = () => {
  const { clearSelectedPokemon, toggleStats, navigatePokemon, selectRandomPokemon } = usePokemonContext();

  return (
    <Box sx={{
        width:"80%",
        height:"30%",
      
        gap:1,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        
    }}>
      
      {/* bottones de menu y azar */}

      <Box sx={{
        width:"100%",
        height:"50%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        paddingX:"3rem",
      }}>

    {/* botones de menu  */}
      <Box sx={{
        height:"67%",
        width:"27%",
        display:"flex",
        justifyContent:"space-between",
      }}>
        {/* boton izquierdo */}
        <Typography 
          onClick={clearSelectedPokemon}
          sx={{
          height:"100%",
          width:"50%",
          backgroundColor:"#e3e3e3",
          border:"solid black 2px",
          fontSize:"0.8rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          cursor:"pointer",
          '&:hover': {
            backgroundColor:"#d0d0d0"
          }
        }} >inicio</Typography>

        {/* boton derecho */}
        <Typography 
        onClick={toggleStats}
        sx={{
          height:"100%",
          width:"50%",
          backgroundColor:"#e3e3e3",
          border:"solid black 2px"
          ,fontSize:"0.8rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          cursor:"pointer",
          '&:hover': {
            backgroundColor:"#d0d0d0"
          }
         
        }} >
            detalles
        </Typography>
       
      </Box>

      {/* botones de azar  */}
      <Typography 
        onClick={selectRandomPokemon}
        sx={{ 
            color:"#000", 
            border:"solid 1.7px black", 
            width:"14%", 
            height:"80%", 
            borderRadius:"50%", 
            backgroundColor:"#c8b857", 
            justifyContent:"center", 
            alignItems:"center", 
            display:"flex", 
            fontSize:"0.8rem",
            cursor: "pointer",
            userSelect: "none",
            '&:hover': {
                backgroundColor: "#b0a048"
            },
            '&:active': {
                backgroundColor: "#8f823a"
            }
        }} >
                Azar
            </Typography>
      
      </Box>

      {/* botones de siguiente y anterior */}

      <Box sx={{
        width:"100%",
        height:"50%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        paddingX:"2rem",
        gap:4,
      }}>
        {/* boton anterior  */}
      <Typography 
        onClick={() => navigatePokemon(-1)}
        sx={{
        width:"50%",
        height:"100%",
        backgroundColor:"#00312b",
        color:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"0.8rem",
        gap:2,
        cursor: "pointer",
        userSelect: "none",
        '&:hover': {
            backgroundColor: "#004d44"
        },
        '&:active': {
            backgroundColor: "#002520"
        }
      }}>
        <ArrowCircleLeftIcon /> Anterior
      </Typography>
        {/* boton siguiente  */}
      <Typography 
        onClick={() => navigatePokemon(1)}
        sx={{
        width:"50%",
        height:"100%",
        backgroundColor:"#00312b"
        ,color:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"0.8rem",
        gap:2,
        cursor: "pointer",
        userSelect: "none",
        '&:hover': {
            backgroundColor: "#004d44"
        },
        '&:active': {
            backgroundColor: "#002520"
        }
      }}>Siguiente <ArrowCircleRightIcon /></Typography>
      </Box>
      
    </Box>
  )
}


