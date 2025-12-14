import axios from 'axios';

export const getSpecies = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.error('Failed to fetch species:', error);
        throw error;
    }
};