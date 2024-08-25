import React, { useState } from 'react';
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
import StartScreen from './components/StartScreen'; // Import ekranu startowego
import CostCalculator from './components/CostCalculator'; // Import komponentu do obliczania kosztów

function App() {
  const [userRole, setUserRole] = useState(null);  // Stan do zarządzania rolą użytkownika
  const [userId, setUserId] = useState(null);  // Dodaj stan do zarządzania identyfikatorem użytkownika

  return (
    <Router>
      <div>
        <Header />
        {userRole && <Navbar userRole={userRole} />}  {/* Przekaż userRole do Navbar */}
        <div className="container">
          <Routes>
            <Route path="/" element={<StartScreen setUserRole={setUserRole} setUserId={setUserId} />} /> {/* Przekaż setUserRole i setUserId */}
            {userRole === 'admin' && <Route path="/clients" element={<ClientList />} />}
            {userRole === 'admin' && <Route path="/add-client" element={<AddClient />} />}
            <Route path="/services" element={<ServiceList userRole={userRole}/>} />
            {userRole === 'admin' && <Route path="/add-service" element={<AddService />} />}
            <Route path="/appointments" element={<AppointmentList userRole={userRole} />} /> {/* Przekaż userRole */}
            <Route path="/add-appointment" element={<AddAppointment userId={userId} />} /> {/* Przekaż userId */}
            <Route path="/cost-calculator" element={<CostCalculator />} /> {/* Nowa ścieżka dla kalkulatora kosztów */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
