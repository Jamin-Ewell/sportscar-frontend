import React, { useEffect, useState } from 'react';
import { getAvailableCars, updateCarStatus } from './services/carService';
import { Form, Button, Card } from 'react-bootstrap';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
}

function Edit() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const availableCars = await getAvailableCars();
        console.log('Fetched cars:', availableCars);
        setCars(availableCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateCarStatus(id, newStatus);
      setCars(cars.map(car => car.id === id ? { ...car, status: newStatus } : car));
    } catch (error) {
      console.error('Failed to update car status', error);
    }
  };

  // Debugging: Log the current state of cars
  useEffect(() => {
    console.log('Current cars state:', cars);
  }, [cars]);

  return (
    <div className="m-3">
      <h2>Edit Car Status</h2>
      {cars.length > 0 ? cars.map((car) => (
        <Card className="mb-3" key={car.id}>
          <Card.Body>
            <Card.Title>{`ID: ${car.id}`}</Card.Title>
            <Card.Text>
              Make: {car.make}, Model: {car.model}, Year: {car.year}
            </Card.Text>
            <Form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newStatus = formData.get('status') as string;
              handleStatusChange(car.id, newStatus);
            }}>
              <Form.Group>
                <Form.Control name="status" placeholder="New Status" />
              </Form.Group>
              <Button variant="primary" type="submit">Update Status</Button>
            </Form>
          </Card.Body>
        </Card>
      )) : <p>No cars available.</p>}
    </div>
  );
}

export default Edit;
