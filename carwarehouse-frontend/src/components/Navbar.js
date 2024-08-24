import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Import globalnych stylów

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Clients 👤</Link></li>
        <li><Link to="/add-client">Add Client</Link></li>
        <li><Link to="/services">Services 🚗</Link></li>
        <li><Link to="/add-service">Add Service</Link></li>
        <li><Link to="/appointments">Appointments 📅 </Link></li>
        <li><Link to="/add-appointment">Add Appointment</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
