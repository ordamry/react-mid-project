import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UsersList({ users, deleteUser }) {
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const isUserCompleted = (userId) => {
    const userTodos = todos.filter((todo) => todo.userId === userId);
    return userTodos.length > 0 && userTodos.every((todo) => todo.completed);
  };

  const handleMarkCompleted = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: true } : todo
      )
    );
  };

  const handleAddPost = (userId) => {
    if (newPostTitle.trim() === "" || newPostBody.trim() === "") return;
    const newPost = {
      userId,
      id: posts.length + 1,
      title: newPostTitle,
      body: newPostBody,
    };
    setPosts([...posts, newPost]);
    setNewPostTitle("");
    setNewPostBody("");
    setIsAddingPost(false);
  };

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

        const userTodos = todos.filter((todo) => todo.userId === user.id);
        const userPosts = posts.filter((post) => post.userId === user.id);

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
                    <button
                      onClick={() => {
                        if (newTodoTitle.trim() === "") return;
                        const newTodo = {
                          userId: user.id,
                          id: todos.length + 1,
                          title: newTodoTitle,
                          completed: false,
                        };
                        setTodos([...todos, newTodo]);
                        setNewTodoTitle("");
                        setIsAddingTodo(false);
                      }}
                    >
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
