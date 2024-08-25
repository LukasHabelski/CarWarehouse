import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';  // Import globalnych stylów

function AppointmentList({ userRole }) {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);  // Stan na przechowanie listy serwisów
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newServiceType, setNewServiceType] = useState('');
  const [invoice, setInvoice] = useState(null); // Stan na przechowanie faktury

  useEffect(() => {
    fetchAppointments();
    fetchServices();
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
    if (userRole === 'admin') {
      axios.delete(`${process.env.REACT_APP_API_URL}/api/appointment/remove/${id}`)
        .then(() => {
          fetchAppointments(); // Odśwież listę spotkań po usunięciu
        })
        .catch(error => {
          console.error('There was an error deleting the appointment!', error);
        });
    } else {
      alert('You do not have permission to delete this appointment.');
    }
  };

  const handleEdit = (appointment) => {
    if (userRole === 'admin') {
      setSelectedAppointment(appointment);
      setNewCustomerName(appointment.customerName);
      setNewDate(new Date(appointment.date).toISOString().slice(0, -1));
      setNewServiceType(appointment.serviceType);
    } else {
      alert('You do not have permission to edit this appointment.');
    }
  };

  const handleUpdate = () => {
    if (userRole === 'admin') {
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
    } else {
      alert('You do not have permission to update this appointment.');
    }
  };

  const handleGenerateInvoice = (appointment) => {
    // Znajdź koszt serwisu
    const service = services.find(s => s.name === appointment.serviceType);
    const cost = service ? service.price : 'N/A';

    setInvoice({
      ...appointment,
      companyName: 'CarWarehouse',
      companyAddress: 'ul. Samochodowa 23/2',
      companyTaxId: '123456',
      cost: cost
    });
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const closeInvoicePopup = () => {
    setInvoice(null);
  };

  return (
    <div>
      <h2>Appointment List</h2>
      {userRole === 'admin' && selectedAppointment && (
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
              {userRole === 'admin' && (
                <>
                  <button onClick={() => handleEdit(appointment)}>Edit 📝</button>
                  <button onClick={() => handleDelete(appointment.id)}>Delete 🗑️</button>
                </>
              )}
              <button onClick={() => handleGenerateInvoice(appointment)}>Generate Invoice 🧾</button>
            </div>
          </li>
        ))}
      </ul>
      {invoice && (
        <div className="invoice-popup">
          <div className="invoice-content">
            <div className="invoice-section">
              <h3>Company Details</h3>
              <p><strong>Company Name:</strong> {invoice.companyName}</p>
              <p><strong>Address:</strong> {invoice.companyAddress}</p>
              <p><strong>Tax ID:</strong> {invoice.companyTaxId}</p>
            </div>
            <div className="invoice-section">
              <h3>Customer Details</h3>
              <p><strong>Customer Name:</strong> {invoice.customerName}</p>
              <p><strong>Date:</strong> {formatDate(invoice.date)}</p>
              <p><strong>Service Type:</strong> {invoice.serviceType}</p>
              <p><strong>Cost:</strong> {invoice.cost} PLN</p>
            </div>
          </div>
          <button onClick={closeInvoicePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
