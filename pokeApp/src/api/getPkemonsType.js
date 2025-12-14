import axios from 'axios';

export const getPokemonsType = async (type) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch pokemons:', error);
        throw error;
    }
};

export const getPokemonsTypeUnique = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch pokemons:', error);
        throw error;
    }
};

