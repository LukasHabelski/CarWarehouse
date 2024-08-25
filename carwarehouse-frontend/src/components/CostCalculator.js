import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Upewnij się, że masz odpowiednie style w tym pliku

function CostCalculator() {
  const [services, setServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Fetch services when component mounts
    axios.get(`${process.env.REACT_APP_API_URL}/api/service`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  }, []);

  useEffect(() => {
    // Calculate total cost based on selected services
    const total = services
      .filter(service => selectedServiceIds.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
    setTotalCost(total);
  }, [selectedServiceIds, services]);

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    setSelectedServiceIds(prevSelectedIds => {
      if (checked) {
        return [...prevSelectedIds, parseInt(value)];
      } else {
        return prevSelectedIds.filter(id => id !== parseInt(value));
      }
    });
  };

  return (
    <div className="cost-calculator">
      <h2>Cost Calculator</h2>
      <form>
        <div className="services-list">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <input
                type="checkbox"
                id={`service-${service.id}`}
                value={service.id}
                onChange={handleServiceChange}
                className="service-checkbox"
              />
              <label htmlFor={`service-${service.id}`} className="service-label">
                {service.name}
              </label>
              <span className="service-price">
                {service.price} PLN
              </span>
            </div>
          ))}
        </div>
      </form>
      <div className="total-cost">
        <h3>Total Cost: {totalCost} PLN</h3>
      </div>
    </div>
  );
}

export default CostCalculator;
