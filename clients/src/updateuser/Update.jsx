import React, { useState, useEffect } from 'react';
import './update.css'; 
import axios from 'axios';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: ""
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  


  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        alert("Error fetching user data");
      });
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    // Name field - block digits
        if (name === "name") {
          if (/\d/.test(value)) {
            toast.error("Name cannot contain numbers", { position: "top-right" });
            return;
          }
        }
    
        // Age field - max 2 digits
        if (name === "age") {
          if (!/^\d{0,2}$/.test(value)) {
            toast.error("Age must be a number less than 100", { position: "top-right" });
            return;
          }
        }
    
        // Mobile field - digits only
        if (name === "mobile") {
          if (!/^\d*$/.test(value)) {
            toast.error("Mobile number must contain digits only", { position: "top-right" });
            return;
          }
        }
    
        // Email field - validate format if not empty
        if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      if (
        value &&
        !emailRegex.test(value) &&
        /\.[a-zA-Z]{2,}$/.test(value)
      ) {
        toast.error("Invalid email format", { position: "top-right" });
        return;
      }
    }
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/user/${id}`, user)
      .then((res) => {
        toast.success(res.data.message, { position: "top-right" });
        setUser(users);
        navigate(`/?page=${page}`);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Error updating user");
      });
  };

  return (
    <div className="add-user-wrapper">
      <Link to={`/?page=${page}`} type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h2 className="text-center mt-3">Update User Profile</h2>
      <form className="addUserform" onSubmit={submitForm}>


        <div className="inputGroup">
          <label htmlFor="name">Name <span style={{ color: 'red' }}>*</span></label>
          <input type="text" id="name" name="name" value={user.name} onChange={inputHandler} placeholder="Enter your name" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
          <input type="email" id="email" name="email" value={user.email} onChange={inputHandler} placeholder="Enter your email" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age <span style={{ color: 'red' }}>*</span></label>
          <input type="number" id="age" name="age" value={user.age} onChange={inputHandler} placeholder="Enter your age" max="99" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile <span style={{ color: 'red' }}>*</span></label>
          <input type="tel" id="mobile" name="mobile" value={user.mobile} onChange={inputHandler} placeholder="Enter your mobile number" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="work">Job Title  <span style={{ color: 'red' }}>*</span></label>
          <input type="text" id="work" name="work" value={user.work} onChange={inputHandler} placeholder="Enter your job title" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address <span style={{ color: 'red' }}>*</span></label>
          <input type="text" id="address" name="address" value={user.address} onChange={inputHandler} placeholder="Enter your address" required />
        </div>
        <div className="inputGroup fullWidth">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={user.description}
            onChange={inputHandler}
            placeholder="Write a brief description..."
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default UpdateUser;
