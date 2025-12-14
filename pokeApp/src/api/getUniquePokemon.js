import axios from 'axios';

export const getUniquePokemon = async (id) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return response.data
    } catch (error) {
        console.error('Failed to fetch pokemons:', error);
        throw error;
    }
};
