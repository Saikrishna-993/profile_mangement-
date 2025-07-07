import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './viewuser.css';
import  '../getUser/User'; 

const ViewUsers = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/user/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="loading">Loading user details...</div>;
  }

  return (
    <div className="view-user-wrapper">
      <Link to="/" className="btn btn-secondary back-btn">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h1 className="title">User Details</h1>
      <h2 >Welcome:  {user.name}</h2>
      <div className="user-details-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Work:</strong> {user.work}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Description:</strong> {user.description}</p>
      </div>
    </div>
  );
};

export default ViewUsers;
