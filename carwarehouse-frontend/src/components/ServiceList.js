import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function ServiceList({ userRole }) {  // Dodajemy userRole jako prop
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/service`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/service/${id}`)
      .then(() => {
        fetchServices();
      })
      .catch(error => {
        console.error('There was an error deleting the service!', error);
      });
  };

  const handleEdit = () => {
    if (selectedService) {
      axios.put(`${process.env.REACT_APP_API_URL}/api/service/${selectedService.id}`, {
        ...selectedService,
        name: newServiceName || selectedService.name,
        description: newServiceDescription || selectedService.description,
        price: newServicePrice || selectedService.price
      })
      .then(() => {
        setSelectedService(null);
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServicePrice('');
        fetchServices();
      })
      .catch(error => {
        console.error('There was an error updating the service!', error);
      });
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setNewServiceName(service.name);
    setNewServiceDescription(service.description);
    setNewServicePrice(service.price);
  };

  return (
    <div>
      <h2>Service List</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name} - {service.description} - {service.price} PLN
            {/* Przyciski są widoczne tylko dla administratora */}
            {userRole === 'admin' && (
              <div className="button-container">
                <button onClick={() => handleServiceSelect(service)}>Edit 📝</button>
                <button onClick={() => handleDelete(service.id)}>Delete 🗑️</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {userRole === 'admin' && selectedService && (
        <div>
          <h3>Edit Service</h3>
          <input 
            type="text" 
            placeholder="Name" 
            value={newServiceName} 
            onChange={(e) => setNewServiceName(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={newServiceDescription} 
            onChange={(e) => setNewServiceDescription(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={newServicePrice} 
            onChange={(e) => setNewServicePrice(e.target.value)} 
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setSelectedService(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ServiceList;
