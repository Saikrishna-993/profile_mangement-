import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Notfound.css'; 

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="notfound-container">
      <h1>404 - No Profile(s) Found</h1>
      <p>The user you’re looking for doesn’t exist or search returned no results.</p>
      <button className="back-btn" onClick={handleBack}>Go Back Home</button>
    </div>
  );
};

export default NotFound;
