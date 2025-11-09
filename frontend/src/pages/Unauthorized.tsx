import React from 'react';
import './Unauthorized.css';

const Unauthorized: React.FC = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this resource.</p>
        <p>Please contact your administrator if you believe this is an error.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
