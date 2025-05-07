import { useState, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
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

  const handleAddTodo = (userId) => {
    if (newTodoTitle.trim() === "") return;
    const newTodo = {
      userId,
      id: todos.length + 1,
      title: newTodoTitle,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
    setIsAddingTodo(false);
  };

  const getUserTodos = (userId) => {
    return todos.filter((todo) => todo.userId === userId);
  };

  return {
    todos,
    isAddingTodo,
    newTodoTitle,
    setIsAddingTodo,
    setNewTodoTitle,
    isUserCompleted,
    handleMarkCompleted,
    handleAddTodo,
    getUserTodos
  };
}; 