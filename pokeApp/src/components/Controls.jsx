import { Box, Input, Typography } from '@mui/material'
import { usePokemonContext } from '../context/PokemonContext'

export const Controls = ({ screenWidth }) => {
  const { scrollToTop, searchPokemon, toggleDarkMode, darkMode, handleScrollUp, handleScrollDown, handleScreenNext, handleScreenPrev } = usePokemonContext();

  return (
    // contenedor de controles debajo de la pantalla
    <Box sx={{ width:"100%", height:"30%"  , display:"flex", padding:"0.5rem"}} >
        {/* botones y buscador */}
      <Box sx={{ width:"70%", height:"100%" , display:"flex", flexDirection:"column"}} >

        {/* contenedor de botones */}
        <Box sx={{ width:"100%", height:"50%", display:"flex" , justifyContent:"space-between", alignItems:"center"}} >

    {/* scroll Up button */}
        <Box sx={{ width:"15%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem", paddingY:"0.4rem"}} >

            <Typography 
              onClick={scrollToTop} 
              sx={{ 
                color:"lightgrey", 
                border:"solid 1.7px black", 
                width:"100%", 
                height:"100%", 
                borderRadius:"50%", 
                backgroundColor:"#00312b", 
                justifyContent:"center", 
                alignItems:"center", 
                display:"flex", 
                fontSize:"0.7rem", 
                cursor:"pointer", 
                '&:hover': { backgroundColor:"#004d44" }
              }} 
            >
                Scroll Up
            </Typography>
            
        </Box>

     {/* dark mode buttons */}

    <Box sx={{display:"flex",  width:"70%", height:"100%", justifyContent:"space-evenly", alignItems:"center"}} >

        <Typography 
          onClick={() => toggleDarkMode(true)}
          sx={{
          border:"solid 1.7px black", 
          width: screenWidth < 1920 ? "4rem" : "3.9rem",
           height:  screenWidth < 1920 ? "1.9rem" : "3rem",
           backgroundColor:"#ff002c",
            borderRadius:"15%",
             display:"flex",
              justifyContent:"center", 
              alignItems:"center",
               fontSize: screenWidth < 1920 ? "1rem" : "1.4rem",
               padding: screenWidth < 1920 ? "0rem 0rem" : "1rem 3rem",
               cursor: "pointer",
               '&:hover': {
                 filter: "brightness(0.9)"
               },
                boxShadow: darkMode ? "inset 0 0 10px rgba(0,0,0,0.5)" : "none", // Active state approx
                }}>Dark</Typography>
         <Typography 
           onClick={() => toggleDarkMode(false)}
           sx={{
          border:"solid 1.7px black",
        width: screenWidth < 1920 ? "4rem" : "3.9rem",
           height:  screenWidth < 1920 ? "1.9rem" : "3rem",
            backgroundColor:"#026796",
             borderRadius:"15%",
              display:"flex",
               justifyContent:"center",
                alignItems:"center", fontSize:"1.4rem",
                 fontSize: screenWidth < 1920 ? "1rem" : "1.4rem",
               padding: screenWidth < 1920 ? "0rem 0rem" : "1rem 3rem",
               cursor: "pointer",
               '&:hover': {
                 filter: "brightness(0.9)"
               },
               boxShadow: !darkMode ? "inset 0 0 10px rgba(0,0,0,0.5)" : "none"
                 }}>Light</Typography>

    </Box>
   
    </Box>

     {/* buscador */}
    <Box sx={{ width:"100%", height:"50%", display:"flex", justifyContent:"flex-end", alignItems:"center", paddingRight:"1.5rem"}} >

        <Input 
          onKeyDown={(e) => {
             if(e.key === 'Enter'){
                 searchPokemon(e.target.value);
             }
          }}
          sx={{border:"solid 2px black", width:"70%", height:"100%", borderRadius:"8px", paddingLeft:"0.5rem", fontSize:"1rem", backgroundColor:"#51ae5f"}} 
          placeholder='Search Pokemon...' 
        />

    </Box>
      </Box>
      {/* cruceta */}
      <Box sx={{ width:"30%", height:"100%", position:"relative", display:"flex", justifyContent:"center", alignItems:"center"}} >

        {/* cruceta horizontal  */}
        <Box sx={{ border:"solid black 3px", width: screenWidth < 1920 ? "6.5rem" : "8rem", height: screenWidth < 1920 ? "2rem" : "2.5rem", position:"absolute", top:"35%", left: screenWidth < 1920 ? "1.5rem" : "2.6rem", borderRadius:"6px", backgroundColor:"#00312b"}} ></Box>
        
        {/* cruceta vertical  */}
        <Box sx={{border:"solid black 3px", width: screenWidth < 1920 ?"2rem":"2.5rem", height: screenWidth < 1920 ? "6.5rem": "8rem", position:"absolute", top: screenWidth < 1920 ? "0.3rem": "1.5rem", left: screenWidth < 1920 ? "3.6rem": "5.2rem", borderRadius:"6px", backgroundColor:"#00312b"} }>
            <Box sx={{border:"solid black 3px", width:"100%", height: screenWidth < 1920 ?"31%": "35%" , borderRadius:"6px", backgroundColor:"#00312b",marginTop: screenWidth < 1920 ?"1.8rem": "2rem"} 
           } ></Box>
        </Box>

        {/* Botón superior - Scroll Arriba */}
        <Box 
          onClick={handleScrollUp}
          sx={{
            position: "absolute",
            top: screenWidth < 1920 ? "0.3rem" : "1.5rem",
            left: screenWidth < 1920 ? "3.6rem" : "5.2rem",
            width: screenWidth < 1920 ? "2rem" : "2.5rem",
            height: screenWidth < 1920 ? "2rem" : "2.5rem",
            cursor: "pointer",
            zIndex: 10,
            '&:hover': {
              backgroundColor: "rgba(255,255,255,0.1)"
            }
          }}
        ></Box>

        {/* Botón inferior - Scroll Abajo */}
        <Box 
          onClick={handleScrollDown}
          sx={{
            position: "absolute",
            top: screenWidth < 1920 ? "4rem" : "6.53rem",
            left: screenWidth < 1920 ? "3.6rem" : "5.2rem",
            width: screenWidth < 1920 ? "2rem" : "2.5rem",
            height: screenWidth < 1920 ? "2.5rem" : "3rem",
            cursor: "pointer",
            zIndex: 10,
            '&:hover': {
              backgroundColor: "rgba(255,255,255,0.1)"
            }
          }}
        ></Box>

         {/* Botón izquierdo - Pantalla Anterior */}
         <Box 
          onClick={handleScreenPrev}
          sx={{
            position: "absolute",
            top: screenWidth < 1920 ? "2.5rem" : "4.3rem",
            left: screenWidth < 1920 ? "1.5rem" : "2.8rem",
            width: screenWidth < 1920 ? "2.3rem" : "2.6rem",
            height: screenWidth < 1920 ? "2rem" : "2.2rem",
            cursor: "pointer",
            zIndex: 10,
            '&:hover': {
              backgroundColor: "rgba(255,255,255,0.1)"
            }
          }}
        ></Box>

        {/* Botón derecho - Pantalla Siguiente */}
        <Box 
          onClick={handleScreenNext}
          sx={{
            position: "absolute",
            top: screenWidth < 1920 ? "2.7rem" : "4.3rem",
            left: screenWidth < 1920 ? "5.4rem" : "7.6rem",
            width: screenWidth < 1920 ? "2.6rem" : "2.8rem",
            height: screenWidth < 1920 ? "2rem" : "2.2rem",
            cursor: "pointer",
            zIndex: 10,
            '&:hover': {
              backgroundColor: "rgba(255,255,255,0.1)"
            }
          }}
        ></Box>

      </Box>
    </Box>
  )
}
