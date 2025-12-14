import { Box, Typography } from "@mui/material";
import { colorPaletteOfType } from "../colorPaletteOfType";
import { usePokemonContext } from "../context/PokemonContext";

export const SetButtonsOfType = () => {
  const typeKeys = Object.keys(colorPaletteOfType);
  const { filterByType, selectedType } = usePokemonContext();

  return (
    <Box sx={{
        width:"80%",
        height : "40%", // Increased height to fit more rows
        justifyContent:"center",
        alignItems:"center",
        display:"flex",
        flexWrap: "wrap",
        gap: "0.4rem", // Slightly smaller gap
        padding: "0.2rem",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" } // Hide scrollbar
    }}>
        {typeKeys.map((type) => (
            <Box 
                key={type}
                onClick={() => filterByType(type)}
                sx={{
                    width: "15%", // Fit 6 in a row (approx 16%)
                    height: "2.8rem",
                    backgroundColor: selectedType === type ? "#1a9bad" : "#22c4ea", // Darker blue if selected
                    border: selectedType === type ? "2px solid white" : "2px solid black",
                    boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:active": {
                        transform: "translateY(2px)",
                        boxShadow: "none"
                    },
                    "&:hover": {
                        filter: "brightness(1.1)"
                    }
                }}
            >
                <Typography sx={{
                    fontSize: "0.6rem", // Small font to fit
                    fontWeight: "bold",
                    color: "black",
                    textTransform: "uppercase",
                    pointerEvents: "none" // Prevent text selection
                }}>
                    {type}
                </Typography>
            </Box>
        ))}
    </Box>
  )
}


