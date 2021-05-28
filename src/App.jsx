import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState(null);
  const [selectedUserId, setUserId] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data));
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;

    setUserId(value);
  };

  return (
    <div className="App">
      <header className="App__header">
        {users ? (
          <label>
            Select a user: &nbsp;

            <select
              name="user"
              className="App__user-selector"
              value={selectedUserId}
              onChange={handleChange}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <div className="App__loading-message">Loading data...</div>
        )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={+selectedUserId}
            postId={Number(postId)}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {typeof postId === 'number' && (
            <PostDetails postId={Number(postId)} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
