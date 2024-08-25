import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function AddAppointment({ userId }) {  // Przyjmuj userId jako props, jeśli potrzebujesz go do przypisania spotkania do użytkownika
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [services, setServices] = useState([]);  // Stan na listę usług

  useEffect(() => {
    // Pobierz usługi z API, gdy komponent się montuje
    axios.get(`${process.env.REACT_APP_API_URL}/api/service`)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Przygotowanie danych spotkania
    const appointment = {
      customerName, // Nazwa klienta
      date: new Date(date).toISOString(), // Konwersja na format ISO 8601
      serviceType,  // Typ usługi
      userId  // Dodaj userId do spotkania, jeśli potrzebujesz
    };

    // Wysłanie żądania POST do API
    axios.post(`${process.env.REACT_APP_API_URL}/api/appointment/save`, appointment)
      .then(response => {
        alert('Appointment added successfully!');
        // Wyczyść formularz po udanym dodaniu
        setCustomerName('');
        setDate('');
        setServiceType('');
      })
      .catch(error => {
        console.error('There was an error adding the appointment!', error);
        alert('Failed to add appointment. Please try again.');
      });
  };

  return (
    <div>
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Date:
          <input 
            type="datetime-local" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Service Type:
          <select 
            value={serviceType} 
            onChange={(e) => setServiceType(e.target.value)} 
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.name}>
                {service.name} - {service.price} PLN
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
}

export default AddAppointment;
