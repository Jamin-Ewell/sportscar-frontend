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

// Example implementation
export async function updateCarStatus(id: any, newStatus: any) {
  const response = await fetch(`https://localhost:7131/cars/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) {
    throw new Error('Could not update car status');
  }
  return await response.json();
}
