import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/posts';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleSelectPost = (id) => {
    if (id !== selectedPostId) {
      setSelectedPostId(id);
      setIsPostDetailsOpen(true);
    } else {
      setIsPostDetailsOpen(!isPostDetailsOpen);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            name="selectedUser"
            value={selectedUserId}
            onChange={e => setSelectedUserId(+e.target.value)}
            className="App__user-selector"
          >
            <option key="All Users" value="0">All Users</option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onSelectPost={handleSelectPost}
            isPostDetailsOpen={isPostDetailsOpen}
          />
        </div>

        <div className="App__content">
          {isPostDetailsOpen === true ? (
            <PostDetails selectedPostId={selectedPostId} />
          ) : (
            <h2>
              No posts opened
            </h2>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
