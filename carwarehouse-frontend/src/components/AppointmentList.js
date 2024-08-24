import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newServiceType, setNewServiceType] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/appointment/getAll`)
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/appointment/remove/${id}`)
      .then(() => {
        fetchAppointments(); // Odśwież listę spotkań po usunięciu
      })
      .catch(error => {
        console.error('There was an error deleting the appointment!', error);
      });
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setNewCustomerName(appointment.customerName);
    setNewDate(new Date(appointment.date).toISOString().slice(0, -1));
    setNewServiceType(appointment.serviceType);
  };

  const handleUpdate = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/appointment/update/${selectedAppointment.id}`, {
      ...selectedAppointment,
      customerName: newCustomerName,
      date: new Date(newDate).toISOString(),
      serviceType: newServiceType
    })
      .then(() => {
        setSelectedAppointment(null);
        setNewCustomerName('');
        setNewDate('');
        setNewServiceType('');
        fetchAppointments(); // Odśwież listę spotkań po edytowaniu
      })
      .catch(error => {
        console.error('There was an error updating the appointment!', error);
      });
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Appointment List</h2>
      {selectedAppointment && (
        <div>
          <h3>Edit Appointment</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <label>
              Customer Name:
              <input
                type="text"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="datetime-local"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Service Type:
              <input
                type="text"
                value={newServiceType}
                onChange={(e) => setNewServiceType(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => { setSelectedAppointment(null); setNewCustomerName(''); setNewDate(''); setNewServiceType(''); }}>Cancel</button>
          </form>
        </div>
      )}
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {formatDate(appointment.date)} - {appointment.customerName} - {appointment.serviceType}
            <div className="button-container">
              <button onClick={() => handleEdit(appointment)}>Edit 📝</button>
              <button onClick={() => handleDelete(appointment.id)}>Delete 🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
