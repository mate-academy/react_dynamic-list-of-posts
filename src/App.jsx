import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  const selectedUserHandler = (event) => {
    const userId = event.target.value;

    setSelectedUser(userId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select className="App__user-selector" onChange={selectedUserHandler}>
            <option value="">All users</option>
            {users.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            onChangePost={setSelectedPostId}
            selectedPost={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails
            postId={selectedPostId}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
