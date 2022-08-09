import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsers } from './api/api';
import { User } from './react-app-env';

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<number>();

  useEffect(() => {
    getAllUsers()
      .then(response => setAllUsers(response));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={currentUser}
            onChange={(event) => {
              setCurrentUser(event.target.value);
            }}
          >
            <option value="0" disabled>All users</option>
            {allUsers.map(user => (
              <option
                key={user.id}
                value={`${user.id}`}
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
            userSelectedId={currentUser}
            selectPost={setSelectedPostId}
            post={selectedPostId}
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
