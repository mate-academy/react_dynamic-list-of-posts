import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { usersDataFromServer } from './api/post';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersDataFromServer()
      .then((user) => {
        setUsers(user.slice(0, 11));
      });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector">
            <option value="0">All users</option>
            {
              users.map((user, index) => (
                <option value={index + 1} key={user.name}>{user.name}</option>
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
