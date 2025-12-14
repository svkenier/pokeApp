import axios from 'axios';

export const getPokemons = async () => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        return response.data.results;
    } catch (error) {
        console.error('Failed to fetch pokemons:', error);
        throw error;
    }
};

