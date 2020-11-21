import React, { useEffect, useState } from "react";
import "./index.css";
import { createUser, deleteUser, getUsers, updateUser } from "./services/User";

const App = () => {
  const defaultEditState = {
    updateId: "",
    updateName: "",
    updateAge: "",
  };
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editState, setEditState] = useState(defaultEditState);

  const addUser = async () => {
    const result = await createUser({ name, age });

    if (!result) {
      window.alert("Create Failed");
    } else {
      window.alert(`${result.message}`);
      await fetchUsers();
    }
  };

  const removeUser = async (deleteId) => {
    const result = await deleteUser(deleteId);

    if (!result) {
      window.alert("Delete failed");
    } else {
      window.alert(`${result.message}`);
      await fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData.records);
  };

  const editUser = (payload) => {
    const transformedPayload = {
      updateId: payload.id,
      updateName: payload.name,
      updateAge: payload.age,
    };

    setEditState(transformedPayload);
  };

  const updateUserAsync = async () => {
    const result = await updateUser(editState);

    if (!result) {
      window.alert("Update Failed");
    } else {
      window.alert(`${result.message}`);
      setEditState(defaultEditState);
      await fetchUsers();
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else {
      setAge(value);
    }
  };

  const handleOnChangeUpdate = (e) => {
    const { name, value } = e.target;
    setEditState({ ...editState, [name]: value });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>Add User</h1>
      <div className="add-form">
        <input
          name="name"
          placeholder="input your name"
          value={name}
          onChange={handleOnChange}
        />
        <input
          name="age"
          placeholder="input your age"
          value={age}
          onChange={handleOnChange}
        />
        <button onClick={addUser}>ADD</button>
      </div>
      <table border="collapse">
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th>ACTION</th>
        </tr>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td className="actions">
                <button onClick={() => editUser(user)}>EDIT</button>
                <button onClick={() => removeUser(user.id)}>DELETE</button>
              </td>
            </tr>
          );
        })}
      </table>
      {!editState.updateId ? null : (
        <div className="update-form">
          <h1>Update user id: {editState.updateId}</h1>
          <input
            name="updateName"
            placeholder="input your name"
            value={editState.updateName}
            onChange={handleOnChangeUpdate}
          />
          <input
            name="updateAge"
            placeholder="input your age"
            value={editState.updateAge}
            onChange={handleOnChangeUpdate}
          />
          <button onClick={updateUserAsync}>UPDATE</button>
        </div>
      )}
    </div>
  );
};

export default App;
