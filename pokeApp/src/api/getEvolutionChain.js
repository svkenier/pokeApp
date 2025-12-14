import axios from 'axios';

export const getEvolutionChain = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch evolution chain:', error);
        throw error;
    }
};
