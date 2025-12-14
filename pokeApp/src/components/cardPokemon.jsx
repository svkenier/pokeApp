import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { colorPaletteOfType } from '../colorPaletteOfType';
import { usePokemonContext } from '../context/PokemonContext';

import { Box } from '@mui/material';

export const CardPokemon = ({ pokemon, handleMouseOver, handleMouseLeave }) => {
  const { handlePokemonClick } = usePokemonContext();
  
  // Get primary type for gradient background
  const primaryType = pokemon.types[0].type.name;
  const primaryColor = colorPaletteOfType[primaryType] || '#5382e9ff';

  return (
    <Card 
      sx={{ 
        width: "30%", 
        height: { xs: "auto", md: "90%" }, 
        minHeight: "fit-content", 
        marginY: "1rem",
        cursor: "pointer",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "#ffffff",
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: "0 12px 24px rgba(0,0,0,0.2), 0 8px 12px rgba(0,0,0,0.15)",
        }
      }} 
      onClick={() => handlePokemonClick(pokemon.id)}
      onMouseOver={() => handleMouseOver(pokemon.id)}
      onMouseLeave={handleMouseLeave}
    >
      <Box sx={{ 
        height: { xs: "auto", md: "100%" }, 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "1rem"
      }}>
        {/* Pokemon Image */}
        <Box sx={{ 
          width: "100%", 
          height: { xs: "90px", md: "50%" }, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          position: "relative"
        }}>
          <CardMedia
            sx={{ 
              height: "100%", 
              width: "100%", 
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              transition: "transform 0.3s ease",
              '&:hover': {
                transform: "scale(1.05)"
              }
            }}
            component="img"
            image={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
          />
        </Box>

        <CardContent sx={{ 
          height: { xs: "auto", md: "50%" }, 
          width: "100%", 
          display: "flex", 
          flexDirection: "column", 
          padding: { xs: "0.2rem 0 0 0", md: "0.5rem 0 0 0" },
          gap: { xs: "0.2rem", md: "0.5rem" },
          alignItems: "center",
          justifyContent: "space-between", // Distribute space
          paddingBottom: { xs: "0.5rem !important", md: "0" },
          "&:last-child": { paddingBottom: { xs: "0.5rem !important", md: 0 } }
        }}>
          {/* Pokemon Number */}
          <Typography 
            variant="body2" 
            sx={{ 
              width: "100%", 
              display: "flex", 
              justifyContent: "flex-start", 
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "rgba(0,0,0,0.5)",
              letterSpacing: "0.5px"
            }}
          >
            N.° {String(pokemon.id).padStart(3, '0')}
          </Typography>

          {/* Pokemon Name */}
          <Typography 
            variant="h6" 
            sx={{ 
              textTransform: 'capitalize', 
              width: "100%", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              fontSize: { xs: "0.9rem", md: "1.1rem", xl: "1.3rem" },
              fontWeight: "700",
              color: "#2c3e50",
              marginBottom: { xs: "0.1rem", md: "0.2rem" },
              lineHeight: 1.2
            }}
          >
            {pokemon.name}
          </Typography>

          {/* Type Badges */}
          <Box sx={{ 
            width: "100%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "0.2rem",
            flexWrap: "nowrap",
            overflow: "visible", // Changed to visible so we can see if they overflow
            minHeight: "1.5rem"  // Ensure container has height
          }}>
            {pokemon.types.map((typeInfo, index) => (
              <Box
                component="span"
                sx={{
                  color: "#fff",
                  padding: { xs: "0.2rem 0.5rem", md: "0.3rem 0.6rem", xl: "0.4rem 0.8rem" },
                  borderRadius: "0.5rem",
                  backgroundColor: colorPaletteOfType[typeInfo.type.name],
                  fontWeight: "700",
                  fontSize: { xs: "0.5rem", md: "0.6rem", xl: "0.75rem" }, // Reduced font size to fit
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  whiteSpace: "nowrap", // Prevent text wrapping inside badge
                  flexShrink: 0
                }}
                key={index}
              >
                {typeInfo.type.name}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
