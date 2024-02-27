import React, { useEffect, useState } from 'react';
import './App.css';
import { getAvailableCars } from './services/carService';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const availableCars = await getAvailableCars();
        setCars(availableCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="App-logo" alt="Car" />
        <h1>Available Cars</h1>
        {cars.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No cars available.</p>
        )}
      </header>
    </div>
  );
}

export default App;
