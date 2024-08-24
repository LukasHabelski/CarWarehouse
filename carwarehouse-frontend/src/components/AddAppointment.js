import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function AddAppointment() {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Przygotowanie danych spotkania
    const appointment = {
      customerName, // Nazwa klienta
      date: new Date(date).toISOString(), // Konwersja na format ISO 8601
      serviceType  // Typ usługi
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
          <input 
            type="text" 
            value={serviceType} 
            onChange={(e) => setServiceType(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
}

export default AddAppointment;
