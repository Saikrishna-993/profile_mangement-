// import './user.css'; 
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const User = () => {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleNumbers, setVisibleNumbers] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       fetchUsers();
//     }
//   }, [searchQuery]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deleteUser = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       const res = await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
//       setUsers(users.filter(user => user._id !== id));
//       toast.success(res.data.message, { position: "top-right", duration: 3000 });
//     } catch (error) {
//       console.error("Delete failed:", error);
//       toast.error("Failed to delete user", { position: "top-right", duration: 3000 });
//     }
//   };

//   const toggleNumberVisibility = (id) => {
//     setVisibleNumbers((prev) => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return;

//     try {
//       const response = await axios.get("http://localhost:8000/api/users");
//       const filtered = response.data.filter(user =>
//         user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.mobile.includes(searchQuery) ||
//         user.address.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       if (filtered.length > 0) {
//         setUsers(filtered);
//         setCurrentPage(1);
//       } else {
//         navigate("/404");
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       toast.error("Error during search", { position: "top-right" });
//     }
//   };

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(users.length / usersPerPage);

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="userTable">
//       <h2 className="text-center mt-3">Profile Management System</h2>
//       <div className="top-bar">
//         <Link to={`/add?page=${currentPage}`} className="btn btn-primary">
//           Add New Profile <PersonAddAltIcon />
//         </Link>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by name, email, phone or location..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       </div>

//       {users.length === 0 ? (
//         <div className="noData">
//           <h3>NO PROFILES FOUND</h3>
//           <p>Please add a new profile </p>
//         </div>
//       ) : (
//         <>
//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th>S.NO</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Age</th>
//                 <th>Job Title</th>
//                 <th>Mobile</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map((user, index) => (
//                 <tr key={user._id}>
//                   <td>{indexOfFirstUser + index + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.age}</td>
//                   <td>{user.work}</td>
//                   <td>
//                     {visibleNumbers[user._id] ? user.mobile : ''}
//                     <button
//                       onClick={() => toggleNumberVisibility(user._id)}
//                       className="eye-btn"
//                       title={visibleNumbers[user._id] ? "Hide number" : "Show number"}
//                     >
//                       {visibleNumbers[user._id] ?<VisibilityOffIcon/> : <VisibilityIcon />}
//                     </button>
//                   </td>
//                   <td className="actionButtons">
//                     <Link to={`/view/${user._id}`} className="btn btn-success"><VisibilityIcon /></Link>
//                     <Link to={`/update/${user._id}`} className="btn btn-primary"><EditIcon /></Link>
//                     <button onClick={() => deleteUser(user._id)} className="btn btn-danger"><DeleteIcon /></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="pagination">
//             <button onClick={handlePrev} disabled={currentPage === 1}>&lt;</button>
//             <span>{currentPage} / {totalPages}</span>
//             <button onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default User;

import './user.css'; 
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleNumbers, setVisibleNumbers] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pageParam = new URLSearchParams(location.search).get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, [location.search]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchUsers();
    }
  }, [searchQuery]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
      setUsers(users.filter(user => user._id !== id));
      toast.success(res.data.message, { position: "top-right", duration: 3000 });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete user", { position: "top-right", duration: 3000 });
    }
  };

  const toggleNumberVisibility = (id) => {
    setVisibleNumbers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get("http://localhost:8000/api/users");
      const filtered = response.data.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.mobile.includes(searchQuery) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length > 0) {
        setUsers(filtered);
        setCurrentPage(1);
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error during search", { position: "top-right" });
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="userTable">
      <h2 className="text-center mt-3">Profile Management System</h2>
      <div className="top-bar">
        <Link to={`/add?page=${currentPage}`} className="btn btn-primary">
          Add New Profile <PersonAddAltIcon />
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, email, phone or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="noData">
          <h3>NO PROFILES FOUND</h3>
          <p>Please add a new profile </p>
        </div>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Job Title</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.work}</td>
                  <td>
                    {visibleNumbers[user._id] ? user.mobile : ''}
                    <button
                      onClick={() => toggleNumberVisibility(user._id)}
                      className="eye-btn"
                      title={visibleNumbers[user._id] ? "Hide number" : "Show number"}
                    >
                      {visibleNumbers[user._id] ?<VisibilityOffIcon/> : <VisibilityIcon />}
                    </button>
                  </td>
                  <td className="actionButtons">
                    <Link to={`/view/${user._id}`} className="btn btn-success"><VisibilityIcon /></Link>
                    <Link to={`/update/${user._id}?page=${currentPage}`} className="btn btn-primary"><EditIcon /></Link>
                    <button onClick={() => deleteUser(user._id)} className="btn btn-danger"><DeleteIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>&lt;</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
          </div>
        </>
      )}
    </div>
  );
};

export default User;

