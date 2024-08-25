import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';  // Import globalnych stylów

function Navbar({ userRole }) {
  return (
    <nav>
      <ul>
        {userRole === 'admin' && <li><Link to="/clients">Clients 👤</Link></li>}
        {userRole === 'admin' && <li><Link to="/add-client">Add Client</Link></li>}
        <li><Link to="/services">Services 🚗</Link></li>
        {userRole === 'admin' && <li><Link to="/add-service">Add Service</Link></li>}
        <li><Link to="/appointments">Appointments 📅 </Link></li>
        <li><Link to="/add-appointment">Add Appointment</Link></li>
        {userRole === 'user' && <li><Link to="/cost-calculator">Cost Calculator</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
