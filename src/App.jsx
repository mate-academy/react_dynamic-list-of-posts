import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import data from './api/users.json';

function App() {
  const [seletedUserId, setSeletedUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  const selectUser = useCallback(event => (
    setSeletedUserId(event.target.value)
  ), []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectUser}
          >
            <option value="0">All users</option>
            {data.users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            seletedUserId={Number(seletedUserId)}
            setPostId={setPostId}
            selectedPostId={Number(selectedPostId)}
          />
        </div>

        {!!selectedPostId
          && (
            <div className="App__content">
              <PostDetails selectedPostId={Number(selectedPostId)} />
            </div>
          )}

      </main>
    </div>
  );
}

export default App;
