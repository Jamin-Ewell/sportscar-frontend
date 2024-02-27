import axios from 'axios';

export const getAvailableCars = async () => {
  try {
    const response = await axios.get('https://localhost:7131/Cars/available'); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch available cars:', error);
    throw error;
  }
};