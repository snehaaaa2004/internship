import React from 'react';
import { useNavigate } from 'react-router-dom';

function Role() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Select Your Role</h1>
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/admin')}
          style={{
            padding: '1rem 2rem',
            margin: '1rem',
            backgroundColor: '#ff6f61',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Are you an Admin?
        </button>
        <button
          onClick={() => navigate('/user')}
          style={{
            padding: '1rem 2rem',
            margin: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Are you a User?
        </button>
      </div>
    </div>
  );
}

export default Role;

