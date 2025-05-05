import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>User Management</h1>
      <Routes>
       <Route path="/" element={<UsersList users={users} setUsers={setUsers} />} />
       <Route path="/edit/:id" element={<EditUser users={users} setUsers={setUsers} />} />
       <Route path="/create" element={<CreateUser users={users} setUsers={setUsers} />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
