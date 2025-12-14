
import { useEffect, useState } from 'react'
import './App.css'
import { Box, } from '@mui/material'
import { Lights } from './components/Lights.jsx'
import { Screen } from './components/Screen.jsx'
import { Controls } from './components/Controls.jsx'
import { RightScreen } from './components/RightScreen.jsx'
import { SetButtonsOfType } from './components/SetButtonsOfType.jsx'
import { SetButtonsRight } from './components/SetButtonsRight.jsx'
import { PokemonProvider, usePokemonContext } from './context/PokemonContext.jsx'



// Main Content Component that consumes the Context
const PokedexHandler = () => {
    const { darkMode } = usePokemonContext();
    const [screenWidth , setScreenWidth] = useState(window.innerWidth)
    const [screenheight , setScreenheight] = useState(window.innerHeight)
    
    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenheight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [screenWidth,screenheight]); 

    // Define colors based on mode
    const backgroundColor = darkMode ? "#2d2d2d" : "#ffffff";

    return (
        <Box  sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: backgroundColor, width: "100%", height: "100vh" }}  >
        

        {/* //left side of pokedex */}
    
        <Box    sx={{ backgroundColor: "#d30a40", height: "95vh", width: "45vw", border: "4px solid #900529", display: "flex", }}>
            
            {/* contenedor de Luces  y pantalla*/}
            <Box sx={{ height: "100%", width: "90%", display: "flex", flexDirection: "column", }}>
            

            <Box sx={{width:"100%",height:"20%",display:"flex"}}>

            {/* contenedor de Luces */}
            <Box
                sx={{
                height: "100%",
                width: "80%",
                borderBottom: "4px solid #900529",
                display: "flex",
                }}>
                <Lights />

            </Box>
            
            {/* contenedor de las lineas */}
            <Box sx={{
                height: "100%",
                width: "20%",
                position:"relative"
            }}>

            {/* linea horisontal*/}
            <Box sx={{ 
                width: 1920 > screenWidth ? "4.3rem" : "5.4rem", 
            border: "4px solid #900529",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
                borderRightColor: "transparent", 
                position: "absolute",
                    left: 1920 > screenWidth ? "41%" : "46%", 
                    top:  "51%",  }}></Box>

            {/* linea diagonal */}

            <Box sx={ {  
                height: 1920 > screenWidth ? "4.9rem" : "7.2rem",
                border: "4px solid #900529",
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                borderRightColor: "transparent", 
                position: "absolute",
                left: 1920 > screenWidth ? "18%" : "22%",
                top:  "43%", 
                transform: " rotate(45deg)"
                } }></Box>
            </Box>
            </Box>

            {/* contenedor de pantalla  y botones*/}

            <Box sx={{ height: "80%", width: "100%", display: "flex",  flexDirection:"column", alignItems:"center" }}>
            
                {/* pantalla */}
                <Screen  />
                {/* controles debajo de la pantalla */}
                <Controls screenWidth={screenWidth} />
            </Box>

            
            </Box>



            {/*  // bisagra */}
            <Box sx={{ height: "90%", width: "10%", border: "4px solid #900529", display: "flex", alignSelf: "flex-end", }}>

            <Box sx={{ width: "100%", height: "7%", border: "solid 4px #900529 ", borderLeftColor: "transparent", borderRightColor: "transparent", marginTop: "85%", borderRadius: "4px" }}></Box>

            </Box>
        

        </Box>
        
        {/* contenedor de lado derecho de pokedex */}
        <Box sx={{ display: "flex", flexDirection: "column",  width: "45vw", height: "95vh", justifyContent: "flex-end" }}>

            {/* saliente de tapa derecha*/}
            <Box sx={{ background: "#d30a40", width: "20%", height: "10%", clipPath: 'polygon(0% 0%, 50% 0%, 100% 100%, 100% 100%, 0% 100%)', borderTop: "4px solid #900529", borderLeft: "4px solid #900529" }}></Box>
            
            {/* linea diagonal de la saliente derecha */}
            <Box sx={ { 
            height : 1920 > screenWidth ? "5.3rem" : "7.8rem",
            border: "4px solid #900529", 
            borderBottomColor: "transparent", 
            borderTopColor: "transparent",
                borderRightColor: "transparent", 
                position: "absolute",
                left:1920 > screenWidth ? "56.5%" : "56.5%", // Moved further right
                top: 1920 > screenWidth ? "10.5%" : "10.7%", // Moved further down
                    transform: " rotate(-45deg)",
                    zIndex:1 }}>

            </Box>

            {/* right side of pokedex */}
            <Box sx={{
            backgroundColor: "#d30a40",
            height: "75vh",
            width: "45vw",
            border: "4px solid #900529",
            borderTop: "none", // Eliminamos el borde top original
            position: "relative",
            
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "19%", // Empieza desde la mitad
                right: 0,
                height: "4px",
                backgroundColor: "#900529"
                
            }
            }}>

            {/* contenedor de elementos de la tapa derecha */}

            <Box sx={{
                width:"100%",
                height:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"space-around",
                paddingY:"0.6rem",
            }}>
                {/* pantalla derecha */}
            <RightScreen />
            
            {/* botones para seleccionar tipo de pokemon */}

            <SetButtonsOfType />


            {/* conjunto de botones de la tapa derecha */}

            <SetButtonsRight />

            </Box>
            
            </Box>
        </Box>
        </Box>
    )
}

function App() {
  return (
    <PokemonProvider>
        <PokedexHandler />
    </PokemonProvider>
  )
}

export default App
