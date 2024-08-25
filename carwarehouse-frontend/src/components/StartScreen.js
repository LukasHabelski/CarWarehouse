import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartScreen({ setUserRole }) {
  const navigate = useNavigate();

  const selectRole = (role) => {
    setUserRole(role);
    navigate('/services');  // Domyślna strona po wybraniu roli
  };


  return (
    <div style={styles.container}>
      <h1>Witamy w CarWarehouse</h1>
      <div style={styles.optionsContainer}>
      <button style={styles.button} onClick={() => selectRole('admin')}>Admin Access</button>
      <button style={styles.button} onClick={() => selectRole('user')}>User Access</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default StartScreen;
