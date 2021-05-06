import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    getUsers()
      .then(result => setUsers(result));
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;

    setSelectedUserId(value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleChange}
          >
            <option value="0">All users</option>

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
            selectedUserId={+selectedUserId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {postId && (
            <PostDetails
              postId={postId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
