import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import './App.css';
import useUsers from "./useUsers"

function App() {
  const { createUser, deleteUser, editUser,getUserById, users} = useUsers ();
  
  return (
    <Router>
      <div className="App">
        <h1>User Management</h1>
      <Routes>
       <Route path="/" element={<UsersList users={users} deleteUser={deleteUser} />} />
       <Route path="/edit/:id" element={<EditUser editUser={editUser} getUserById={getUserById} />} />
       <Route path="/create" element={<CreateUser createUser={createUser} />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
