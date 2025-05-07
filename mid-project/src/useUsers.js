import { useState, useEffect } from "react";

const useUsers = () => {
     const [users, setUsers] = useState([]);
    
      useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => setUsers(data));
      }, []);

      const deleteUser = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
      }

      const generateUserId = () => {
        return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1 ;
      }

      const createUser =  async (newUser) => {
        newUser.id = generateUserId ();
        try {
            await fetch("https://jsonplaceholder.typicode.com/users", {
              method: "POST",
              body: JSON.stringify(newUser),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
      
            setUsers([...users, newUser]);
            return {success: true} ;
          } catch (error) {
            console.error("Error creating user:", error);
            return {success: false} ;
          }

      }

      const getUserById = (userId) => {
        return users.find((u) => u.id === userId);
      }

      const editUser = (user) => {
        const updatedUsers = users.map((u) =>
            u.id === user.id ? user : u
          );
          setUsers(updatedUsers);
      }

      return {
        createUser,
        deleteUser,
        editUser,
        getUserById,
        users,
      }

}
export default useUsers ;