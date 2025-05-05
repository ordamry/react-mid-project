import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser({ users, setUsers }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = users.find((u) => u.id === parseInt(id));
    if (existingUser) {
      setUser(existingUser);
      setName(existingUser.name);
      setEmail(existingUser.email);
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { ...user, name, email };
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);

    alert(`User updated: ${name}, ${email}`);
    navigate("/");
  };

  if (!user) return <p>Loading user...</p>;

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
      </form>
    </div>
  );
}

export default EditUser;
