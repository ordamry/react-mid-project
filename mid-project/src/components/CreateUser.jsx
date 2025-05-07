import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser({createUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      phone: "N/A",
      website: "N/A",
      address: { city: "N/A" },
    };

    const resp = await createUser(newUser);
     if (resp?.success) navigate("/");
     else
     alert("user create failed");
  };

  return (
    <div className="user-form">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            required
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="action-button">Create</button>
        <button type="button" className="action-button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateUser;
