import { Box, Typography } from '@mui/material';
import React from 'react';

export const PokemonStatsView = ({ pokemon }) => {
  const statsMapping = [
    { key: 'hp', label: 'PS' },
    { key: 'attack', label: 'Ataque' },
    { key: 'defense', label: 'Defensa' },
    { key: 'special-attack', label: 'Ataque Especial' },
    { key: 'special-defense', label: 'Defensa Especial' },
    { key: 'speed', label: 'Velocidad' },
  ];

  // Max stat value for scaling (255 is approx max possible base stat)
  // But usually 160-200 is a good range for "full bar" visual in base forms.
  // Let's use 200 effectively, but mapped to 15 blocks.
  const MAX_BLOCKS = 15;
  const MAX_STAT_VALUE = 200;

  const getStatValue = (statName) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  const calculateBlocks = (value) => {
    const filled = Math.min(Math.ceil((value / MAX_STAT_VALUE) * MAX_BLOCKS), MAX_BLOCKS);
    return filled;
  };

  const renderBar = (statName) => {
    const value = getStatValue(statName);
    const filledBlocks = calculateBlocks(value);
    const blocks = [];

    for (let i = 0; i < MAX_BLOCKS; i++) {
      blocks.push(
        <Box
          key={i}
          sx={{
            width: "100%",
            height: "5%", // Small gap between blocks
            marginBottom: "1px",
            backgroundColor: i < filledBlocks ? "#30a7d7" : "white",
            border: "1px solid transparent"
          }}
        />
      );
    }
    // Render from bottom to top appearance requires column-reverse? 
    // Or just render normal and flex-direction column-reverse.
    return blocks; // Logic below handles direction
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "1rem", backgroundColor: "#b0e0e6" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
            Puntos de base
        </Typography>
        <Typography sx={{ color: "#444", fontWeight: "bold", textTransform: "capitalize", fontSize: "0.9rem" }}>
            {pokemon.name} N.º {String(pokemon.id).padStart(3, '0')}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", width: "100%", height: "80%", alignItems: "flex-end", justifyContent: "space-between", gap: 1 }}>
        {statsMapping.map((stat) => (
          <Box key={stat.key} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "16%", height: "100%" }}>
            
            {/* Bar Container */}
            <Box sx={{ 
                width: "100%", 
                height: "85%", 
                display: "flex", 
                flexDirection: "column-reverse", // Fill from bottom
                justifyContent: "flex-start" 
            }}>
                {renderBar(stat.key)}
            </Box>

            {/* Label */}
            <Typography sx={{ 
                fontSize: "0.6rem", 
                fontWeight: "bold", 
                marginTop: "0.5rem", 
                textAlign: "center",
                color: "#333",
                lineHeight: 1.2
            }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
