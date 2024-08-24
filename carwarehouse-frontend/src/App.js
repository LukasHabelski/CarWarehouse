import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';  // Import globalnych stylów
import AddClient from './components/AddClient';
import ClientList from './components/ClientList';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';
import AddAppointment from './components/AddAppointment';
import Navbar from './components/Navbar';
import AppointmentList from './components/AppointmentList';
import Header from './components/Header';  // Importuj komponent nagłówka

function App() {
  return (
    <Router>
      <div>
        <Header />  {/* Dodaj nagłówek */}
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
