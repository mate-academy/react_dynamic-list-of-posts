import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setSelectedPost] = useState(0);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const onSelectedPost = id => (id === selectedPost
    ? setSelectedPost(0)
    : setSelectedPost(id));

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={e => setSelectedUser(+e.target.value)}
          >
            <option
              value={0}
            >
              All Users
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            setSelectedPost={onSelectedPost}
            selectedPost={selectedPost}
          />
        </div>

        {selectedPost !== 0 && (
        <div className="App__content">
          <PostDetails post={selectedPost} />
        </div>
        )}
      </main>
    </div>
  );
};

export default App;
