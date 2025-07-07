Profile Management System (MERN Stack)

A full-featured "Profile Management System" built using the "MERN stack" where users can create, read, update, delete (CRUD), and search profiles. 
It includes real-time form validations, pagination, and 404 handling for unmatched or missing profiles.



Features

- Add new user profiles
- View profile list with pagination
- Update existing profiles
- Delete user profiles
- Search by name, email, mobile, or address
- Show/hide mobile numbers securely
- Client-side validations for form fields
- 404 Page for user not found
- Clean and responsive UI with **React** and **Bootstrap**
- Toast notifications for actions (using `react-hot-toast`)


Tech Stack

| Technology      | Description                   |
|-----------------|-------------------------------|
| React.js        | Frontend UI                   |
| Node.js         | Backend runtime               |
| Express.js      | Backend framework             |
| MongoDB         | NoSQL database                |
| Mongoose        | ODM for MongoDB               |
| Axios           | API requests                  |
| React Router    | Frontend routing              |
| react-hot-toast | Toast messages                |
| dotenv, cors    | Environment & middleware      |


Project Structure

client/
├── adduser/
├── getUser/
├── updateuser/
├── viewUser/
├── usernotfound/
└── App.js, index.js, etc.

server/
├── controller/
├── model/
├── routes/
└── app.js

Getting Started

1. Clone the repository
git clone https://github.com/your-username/profile-management-system.git
cd profile-management-system


2. Start Backend
cd server
npm install
Create .env file
echo "MONGO_URI=mongodb://localhost:27017/React" > .env
npm run dev


3. Start Frontend
cd client
npm install
npm start
