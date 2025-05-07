import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useTodos } from "../hooks/useTodos";

function UsersList({ users, deleteUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const {
    isAddingPost,
    newPostTitle,
    newPostBody,
    setIsAddingPost,
    setNewPostTitle,
    setNewPostBody,
    handleAddPost,
    getUserPosts
  } = usePosts();

  const {
    isAddingTodo,
    newTodoTitle,
    setIsAddingTodo,
    setNewTodoTitle,
    isUserCompleted,
    handleMarkCompleted,
    handleAddTodo,
    getUserTodos
  } = useTodos();

  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => navigate("/create")} style={{ marginBottom: "20px" }}>
        ➕ Create New User
      </button>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
      />

      {filteredUsers.map((user) => {
        const completed = isUserCompleted(user.id);
        const isSelected = selectedUserId === user.id;

        const userTodos = getUserTodos(user.id);
        const userPosts = getUserPosts(user.id);

        return (
          <div
            key={user.id}
            className={`user-card ${completed ? "completed" : "incomplete"} ${isSelected ? "selected" : ""}`}
            style={{
              backgroundColor: isSelected ? "orange" : "",
            }}
          >
            <button onClick={() => setSelectedUserId(user.id)} style={{ marginBottom: "10px" }}>
              ID: {user.id}
            </button>

            <strong>{user.name}</strong> <br />
            <span>{user.email}</span>
            <em>Status: {completed ? "All tasks completed ✅" : "Incomplete ❌"}</em>

            <Link to={`/edit/${user.id}`}>Edit</Link>
            <button onClick={() => deleteUser(user.id)} style={{ marginTop: "10px" }}>
              Delete
            </button>

            <div className="other-data">
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
              <p><strong>City:</strong> {user.address?.city}</p>
            </div>

            {isSelected && (
              <div className="extra-data" style={{ marginTop: "10px" }}>
                <h4>Todos:</h4>
                <button onClick={() => setIsAddingTodo(!isAddingTodo)}>
                  {isAddingTodo ? "Cancel" : "Add"}
                </button>
                {isAddingTodo ? (
                  <div>
                    <input
                      type="text"
                      placeholder="New todo title"
                      value={newTodoTitle}
                      onChange={(e) => setNewTodoTitle(e.target.value)}
                    />
                    <button onClick={() => handleAddTodo(user.id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <ul>
                    {userTodos.map((todo) => (
                      <li key={todo.id}>
                        {todo.title} {todo.completed ? "✅" : (
                          <button onClick={() => handleMarkCompleted(todo.id)}>
                            Mark Completed
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                <h4>Posts:</h4>
                <button onClick={() => setIsAddingPost(!isAddingPost)}>
                  {isAddingPost ? "Cancel" : "Add"}
                </button>
                {isAddingPost ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Post title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Post body"
                      value={newPostBody}
                      onChange={(e) => setNewPostBody(e.target.value)}
                    />
                    <button onClick={() => handleAddPost(user.id)}>Save</button>
                  </div>
                ) : (
                  <ul>
                    {userPosts.map((post) => (
                      <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
