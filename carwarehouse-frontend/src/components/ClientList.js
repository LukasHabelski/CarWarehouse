import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/client/getAll`)
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the clients!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/client/${id}`)
      .then(() => {
        fetchClients();
      })
      .catch(error => {
        console.error('There was an error deleting the client!', error);
      });
  };

  const handleEdit = () => {
    if (selectedClient) {
      axios.put(`${process.env.REACT_APP_API_URL}/api/client/${selectedClient.id}`, {
        ...selectedClient,
        name: newClientName || selectedClient.name,
        email: newClientEmail || selectedClient.email,
        phone: newClientPhone || selectedClient.phone
      })
      .then(() => {
        setSelectedClient(null);
        setNewClientName('');
        setNewClientEmail('');
        setNewClientPhone('');
        fetchClients();
      })
      .catch(error => {
        console.error('There was an error updating the client!', error);
      });
    }
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setNewClientName(client.name);
    setNewClientEmail(client.email);
    setNewClientPhone(client.phone);
  };

  return (
    <div>
      <h2>Client List</h2>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            ID:{client.id} - {client.name} - {client.email} - {client.phone}
            <div className="button-container">
            <button onClick={() => handleClientSelect(client)}>Edit 📝</button>
            <button onClick={() => handleDelete(client.id)}>Delete 🗑️</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedClient && (
        <div>
          <h3>Edit Client</h3>
          <input 
            type="text" 
            placeholder="Name" 
            value={newClientName} 
            onChange={(e) => setNewClientName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={newClientEmail} 
            onChange={(e) => setNewClientEmail(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Phone" 
            value={newClientPhone} 
            onChange={(e) => setNewClientPhone(e.target.value)} 
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setSelectedClient(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ClientList;
