import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App: React.FC = () => {
  const [selectedUserId, changeUserId] = useState(0);
  const [selectedPostId, changePostId] = useState(0);
  const [button, changeButton] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const buttonState = ((value: number) => {
    changePostId(value);
    changeButton(!button);
  });

  useEffect(() => {
    getUsers().then(result => setUsers(result));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            value={selectedUserId}
            onChange={event => changeUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users && (
              users.map((user : User) => {
                const { name, id } = user;

                return (
                  <option key={id} value={id}>{name}</option>
                );
              })
            )}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            onPostId={buttonState}
            button={button}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {button ? (
            <PostDetails selectedPostId={selectedPostId} />
          ) : (
            <h2>Select post to see details</h2>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
