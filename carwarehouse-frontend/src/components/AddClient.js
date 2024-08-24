import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function AddClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const client = { name, email, phone };

    axios.post(`${process.env.REACT_APP_API_URL}/api/client`, client)
      .then(() => {
        alert('Client added successfully!');
        setName('');
        setEmail('');
        setPhone('');
      })
      .catch(error => {
        console.error('There was an error adding the client!', error);
      });
  };

  return (
    <div>
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}

export default AddClient;
