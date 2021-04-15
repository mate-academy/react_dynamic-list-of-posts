import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import classNames from 'classnames';
import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [users, setUsers] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const onChangeHandler = (event) => {
    setSelectedUserId(event.target.value);
    setSelectedPostId(null);
  };

  const setPostIdHandler = (postId) => {
    setSelectedPostId(postId);
  };

  const unsetPostIdHandler = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <div
            className={classNames(
              'select',
              { 'is-loading': users === null },
            )}
          >
            <select
              value={selectedUserId}
              onChange={onChangeHandler}
            >
              <option value="0">All users</option>

              {users && users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
              }
            </select>
          </div>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={Number(selectedUserId)}
            onOpen={setPostIdHandler}
            onClose={unsetPostIdHandler}
            selectedId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
