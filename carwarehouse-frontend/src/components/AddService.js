import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function AddService() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const service = { name, description, price };

    axios.post(`${process.env.REACT_APP_API_URL}/api/service`, service)
      .then(() => {
        alert('Service added successfully!');
        setName('');
        setDescription('');
        setPrice('');
      })
      .catch(error => {
        console.error('There was an error adding the service!', error);
      });
  };

  return (
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default AddService;
