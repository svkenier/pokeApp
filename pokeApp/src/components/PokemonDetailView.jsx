import { Box, Typography } from '@mui/material';
import { colorPaletteOfType } from '../colorPaletteOfType';
import { usePokemonContext } from '../context/PokemonContext';
import { useEffect } from 'react';

export const PokemonDetailView = ({ pokemon }) => {
  const { infoPokemon, handleMouseOver } = usePokemonContext();

  // Trigger data fetch when component mounts
  useEffect(() => {
    if (pokemon?.id) {
      handleMouseOver(pokemon.id);
    }
  }, [pokemon?.id]);

  if (!pokemon) return null;

  const primaryType = pokemon.types[0].type.name;
  const backgroundColor = colorPaletteOfType[primaryType] || '#5382e9ff';

  // Traducción de tipos al español
  const typeTranslations = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada'
  };

  return (
    <Box 
      sx={{ 
        height: "100%", 
        width: "100%", 
        display: "flex",
        backgroundColor: backgroundColor,
      }}
    >
      {/* Left side - Pokemon Image (full height) */}
      <Box 
        sx={{ 
          width: "40%", 
          height: "100%", 
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "1rem",
          paddingTop: "0.5rem"
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            textTransform: 'capitalize', 
            fontSize: { xs: "0.8rem", md: "0.9rem", xl: "1rem" },
            color: "#666",
            marginBottom: { xs: "0.2rem", xl: "0.4rem" }
          }}
        >
          {pokemon.name} N.° {String(pokemon.id).padStart(3, '0')}
        </Typography>
        <Box
          component="img"
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          sx={{
            width: "100%",
            height: "calc(100% - 2rem)",
            objectFit: "contain"
          }}
        />
      </Box>

      {/* Right side - Pokemon Stats and Description */}
      <Box 
        sx={{ 
          width: "60%", 
          height: "100%", 
          display: "flex",
          flexDirection: "column",
          color: "white"
        }}
      >
        {/* Top section - Stats in 2 columns */}
        <Box sx={{
          display: "flex",
          padding: { xs: "0.5rem", md: "0.8rem", xl: "1rem" },
          paddingBottom: "0rem",
          gap: { xs: "0.4rem", md: "0.8rem", xl: "1.2rem" },
        }}>
          {/* Left Column */}
          <Box sx={{ 
            width: "50%", 
            display: "flex", 
            flexDirection: "column", 
            gap: { xs: "0.2rem", md: "0.5rem", xl: "0.8rem" }
          }}>
            {/* Altura */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, lineHeight: 1 }}>Altura</Typography>
              <Typography sx={{ fontSize: { xs: "0.9rem", xl: "1rem" }, fontWeight: "500" }}>
                {(pokemon.height / 10).toFixed(1)} m
              </Typography>
            </Box>

            {/* Peso */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, lineHeight: 1 }}>Peso</Typography>
              <Typography sx={{ fontSize: { xs: "0.9rem", xl: "1rem" }, fontWeight: "500" }}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Typography>
            </Box>

            {/* Sexo */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, lineHeight: 1 }}>Sexo</Typography>
              <Typography sx={{ fontSize: { xs: "1rem", xl: "1.1rem" }, fontWeight: "500" }}>
                ♂ ♀
              </Typography>
            </Box>
          </Box>

          {/* Right Column */}
          <Box sx={{ 
            width: "50%", 
            display: "flex", 
            flexDirection: "column", 
            gap: { xs: "0.2rem", md: "0.5rem", xl: "0.8rem" }
          }}>
            {/* Tipo */}
            {/* Tipo */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, lineHeight: 1, marginBottom: "0.1rem" }}>Tipo</Typography>
              <Box sx={{ display: "flex", gap: "0.2rem", flexWrap: "wrap" }}>
                {pokemon.types.map((typeInfo, index) => {
                  const typeName = typeInfo.type.name;
                  return (
                    <Box
                      key={index}
                      sx={{
                        padding: { xs: "0.1rem 0.4rem", xl: "0.2rem 0.6rem" },
                        borderRadius: "0.3rem",
                        backgroundColor: colorPaletteOfType[typeName],
                        fontSize: { xs: "0.6rem", xl: "0.75rem" },
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        border: "1px solid rgba(255,255,255,0.3)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}
                    >
                      {typeTranslations[typeName] || typeName}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Habilidad */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, lineHeight: 1 }}>Habilidad</Typography>
              <Typography sx={{ fontSize: { xs: "0.85rem", xl: "1rem" }, fontWeight: "500", textTransform: "capitalize" }}>
                {pokemon.abilities?.[0]?.ability.name.replace('-', ' ') || 'N/A'}
              </Typography>
            </Box>

            {/* Debilidades */}
            {infoPokemon?.weaknesses && infoPokemon.weaknesses.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, lineHeight: 1, marginBottom: "0.1rem" }}>Debilidades</Typography>
                <Box sx={{ display: "flex", gap: "0.2rem", flexWrap: "wrap" }}>
                  {infoPokemon.weaknesses.slice(0, 3).map((weakness, index) => (
                    <Box
                      key={index}
                      sx={{
                        padding: "0.1rem 0.3rem",
                        borderRadius: "0.2rem",
                        backgroundColor: colorPaletteOfType[weakness],
                        fontSize: { xs: "0.55rem", xl: "0.7rem" },
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        border: "1px solid rgba(255,255,255,0.3)"
                      }}
                    >
                      {typeTranslations[weakness] || weakness}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Bottom section - Description (Red box area) */}
        <Box sx={{ 
          flex: 1,
          minHeight: "60px",
          margin: { xs: "0.5rem", md: "0 1rem 1rem 1rem", xl: "0 1.5rem 1.5rem 1.5rem" },
          paddingTop: { xs: "0.4rem", xl: "0.6rem" },
          paddingBottom: { xs: "1rem", xl: "1.2rem" },
          paddingLeft: { xs: "0.8rem", xl: "1rem" },
          paddingRight: { xs: "0.8rem", xl: "1rem" },
          border: "2px solid rgba(255,255,255,0.3)",
          borderRadius: "0.5rem",
          backgroundColor: "rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden" 
        }}>
          <Typography sx={{ fontSize: { xs: "0.7rem", xl: "0.85rem" }, opacity: 0.9, marginBottom: "0.2rem", fontWeight: "600" }}>
            Información
          </Typography>
          {infoPokemon?.description ? (
            <Typography sx={{ fontSize: { xs: "0.65rem", md: "0.75rem", xl: "0.85rem" }, lineHeight: 1.2, opacity: 0.95 }}>
              {infoPokemon.description}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: { xs: "0.65rem", md: "0.75rem" }, lineHeight: 1.2, opacity: 0.7, fontStyle: "italic" }}>
              Cargando información...
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
