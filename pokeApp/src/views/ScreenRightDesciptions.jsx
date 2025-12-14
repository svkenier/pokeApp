import React from 'react';
import { Box, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Assuming this icon exists or use text
import { usePokemonContext } from '../context/PokemonContext'
import { colorPaletteOfType } from '../colorPaletteOfType'

export const ScreenRightDesciptions = () => {
  const { infoPokemon, selectedPokemon, pokemon } = usePokemonContext();
  
  // Extraer datos para ambos modos
  const { evolutions = [], types = [], weaknesses = [], description = '', name } = infoPokemon;

  // Si no hay pokemon seleccionado o en hover, mostrar vacío verde
  if (!pokemon || !pokemon.name) {
    return (
      <Box sx={{ backgroundColor: "#51ae5f", height:"100%", width:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", paddingX:"1rem" , paddingY:"0.4rem" }} >
      </Box>
    );
  }

  // Para modo hover: esperar a que todos los datos estén cargados
  const isDataReady = !selectedPokemon && (types.length > 0 && description && weaknesses.length > 0);
  
  if (!selectedPokemon && !isDataReady) {
    return (
      <Box sx={{ backgroundColor: "#51ae5f", height:"100%", width:"100%", display:"flex", flexDirection:"column", alignItems:"flex-start", paddingX:"1rem" , paddingY:"0.4rem" }} >
      </Box>
    );
  }

  // MODO DETALLE (Clic): Mostrar Cadena Evolutiva
  if (selectedPokemon) {
      return (
        <Box sx={{ 
            height:"100%", 
            width:"100%", 
            display:"flex", 
            flexDirection:"column",
            background: "repeating-linear-gradient( -45deg, #444, #444 10px, #555 10px, #555 20px )",
            color: "white",
            padding: { xs: "0.3rem 1rem 0.8rem 1rem", md: "0.5rem 2rem 1.5rem 2rem" }, // Added bottom padding
            overflow: "hidden"
        }} >
            <Typography variant="subtitle1" sx={{ 
                fontWeight: "bold", 
                marginBottom: { xs: "0", md: "0.2rem" }, // Reduced margin
                fontSize: { xs: "0.9rem", md: "1rem" },
                textAlign: "left", 
                width: "100%",
                zIndex: 2
            }}>
                Evoluciones
            </Typography>

            <Box sx={{ 
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "space-around", 
                height: "auto", 
                flex: 1, 
                width: "100%",
                gap: 0.5,
                paddingBottom: { xs: "0.5rem", md: 0 }
            }}>
                {evolutions && evolutions.length > 0 ? (
                    evolutions.map((evo, index) => (
                        <React.Fragment key={evo.id}>
                            {/* Evo Item */}
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "auto" }}>
                                
                                {/* Circle Image */}
                            <Box sx={{ 
                                width: { xs: "35px", md: "90px", xl: "120px" }, // Standard on md, Large on xl
                                height: { xs: "35px", md: "70.9px", xl: "120px" }, 
                                borderRadius: "50%", 
                                border: { xs: "2px solid white", md: "4px solid white" }, 
                                backgroundColor: "rgba(255,255,255,0.15)", 
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "4px",
                                overflow: "hidden",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.4)" 
                            }}>
                                <img src={evo.sprites} alt={evo.name} style={{ width: "85%", height: "85%", objectFit: "contain" }} />
                            </Box>

                            {/* Name & ID */}
                            <Typography sx={{ 
                                fontSize: { xs: "0.65rem", md: "0.9rem", xl: "1.2rem" }, // Standard on md, Large on xl
                                fontWeight: "bold", 
                                textTransform: "capitalize", 
                                textShadow: "1px 1px 3px black", 
                                marginBottom: "0",
                                lineHeight: 1
                            }}>
                                {evo.name}
                            </Typography>
                            <Typography sx={{ fontSize: "0.6rem", color: "#ddd", fontWeight: "500", marginBottom: "2px", lineHeight: 1 }}>
                                N.º {String(evo.id).padStart(3, '0')}
                            </Typography>

                            {/* Types */}
                             <Box sx={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
                                {evo.types.map((t) => (
                                    <Box key={t} sx={{ 
                                        backgroundColor: colorPaletteOfType[t], 
                                        borderRadius: "3px", 
                                        padding: "1px 4px", 
                                        fontSize: "0.5rem",
                                        fontWeight: "bold",
                                        textTransform: "capitalize",
                                        border: "1px solid rgba(255,255,255,0.4)",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.3)"
                                    }}>
                                        {t === "fighting" ? "lucha" : t}
                                    </Box>
                                ))}
                            </Box>
                            </Box>

                            {/* Arrow (if not last) */}
                            {index < evolutions.length - 1 && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: "white", paddingX: "0.2rem" }}>
                                    <Typography sx={{ fontSize: "2rem", fontWeight: "bold", opacity: 0.7 }}>&gt;</Typography>
                                </Box>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <Typography variant="body2" sx={{ color: "gray" }}>Cadena no disponible</Typography>
                )}
            </Box>
        </Box>
      );
  }

  // MODO HOVER (Sin clic): Mostrar Descripción, Tipos y Debilidades
  // Badge styling helper
  /* Badge styling helper moved to inline or adjusted in render for responsiveness */
  const badgeBaseStyle = {
    color: "#fff",
    borderRadius: "20px",
    fontWeight: "bold",
    textTransform: "capitalize",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.2)",
    display: "inline-block"
  };

  return (
    <Box sx={{ 
        backgroundColor: "#51ae5f", 
        height:"100%", 
        width:"100%", 
        display:"flex", 
        flexDirection:"column", 
        flexDirection:"column", 
        padding: { xs: "0.4rem 0.6rem 0.6rem 0.6rem", md: "0.8rem 1.2rem 1.5rem 1.2rem", xl: "1rem 1.5rem 2rem 1.5rem" },
        justifyContent: "space-between",
        overflow: "hidden" 
    }} >
        
        {/* Description Section - Centered and Prominent */}
        <Box sx={{ 
            flexGrow: 1, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            paddingBottom: "1rem"
        }}>
            <Typography variant="body1"
             sx={{ 
               fontSize: { xs: "0.7rem", md: "0.9rem", xl: "1.1rem" },
               fontWeight: "500",
               color: "#fff", 
               textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
               textAlign: "center",
               lineHeight: { xs: 1.1, md: 1.4, xl: 1.5 },
               fontStyle: "italic"
             }}>
                "{description || "Información no disponible"}"
            </Typography>
        </Box>

        {/* Info Section - Types and Weaknesses */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: { xs: 0.5, md: 2 } }}> 
            
            {/* Tipos */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Typography variant="body2" sx={{ 
                    fontWeight: "bold", 
                    color: "#fff", 
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    width: "85px",
                    flexShrink: 0,
                    marginTop: "4px" // Align with badges
                }}>
                    Tipo:
                </Typography>
                
                {(() => {
                  // Use infoPokemon.types if available, otherwise fallback to pokemon.types for immediate display
                  const displayTypes = types.length > 0 
                    ? types 
                    : (pokemon?.types?.map(t => t.type.name) || []);
                  
                  return displayTypes.length > 0 ? (
                    <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {displayTypes.map((typeName, index) => (
                        <Box key={index} sx={{ 
                            ...badgeBaseStyle, 
                            backgroundColor: colorPaletteOfType[typeName],
                            padding: { xs: "2px 8px", md: "4px 10px" },
                            fontSize: { xs: "0.65rem", md: "0.8rem" }
                        }}>
                            {typeName}
                        </Box>
                    ))}
                    </Box>
                  ) : (
                    <Typography variant="caption" sx={{ color: "#eee" }}>N/A</Typography>
                  );
                })()}
            </Box>

            {/* Debilidades */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <Typography variant="body2" sx={{ 
                    fontWeight: "bold", 
                    color: "#fff", 
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    width: "85px",
                    flexShrink: 0,
                    marginTop: "4px"
                }}>
                    Debilidades:
                </Typography>

                {weaknesses.length > 0 ? (
                    <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    {weaknesses.map((weaknessName, index) => (
                        <Box key={index} sx={{ 
                            ...badgeBaseStyle, 
                            backgroundColor: colorPaletteOfType[weaknessName],
                            padding: { xs: "2px 8px", md: "4px 10px" },
                            fontSize: { xs: "0.65rem", md: "0.8rem" }
                        }}>
                            {weaknessName}
                        </Box>
                    ))}
                    </Box>
                ) : (
                    <Typography variant="caption" sx={{ color: "#eee" }}>N/A</Typography>
                )}
            </Box>
         
        </Box>
    </Box>
  )
}
