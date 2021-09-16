import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/api';

const App: React.FC = () => {
  const [users, setUsers] = useState([] as User[]);
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [selectedPostID, setSelectedPostID] = useState(0);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(+event.target.value);
  };

  const changePostId = (postId: number) => {
    setSelectedPostID(postId);
  };

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleUserChange}
          >
            <option value={0}>All users</option>
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
            selectedUserID={selectedUserID}
            changePostId={changePostId}
            selectedPostId={selectedPostID}
          />
        </div>

        {selectedPostID !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostID} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
