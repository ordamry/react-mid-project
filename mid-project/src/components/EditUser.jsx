import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser({ getUserById, editUser }) {
  const { id } = useParams();
  const user = getUserById(parseInt(id));
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();

    editUser({ ...user, name, email }) ;
    alert(`User updated: ${name}, ${email}`);
    navigate("/");
  };


  return (
    <div>
      <h2>Edit User: {user.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditUser;
