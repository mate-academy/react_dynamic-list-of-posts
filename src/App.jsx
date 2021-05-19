import React, { useEffect, useState } from 'react';
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

  function handleSelectPost(id) {
    if (id !== selectedPostId) {
      setSelectedPostId(id);
      setIsPostDetailsOpen(true);
    } else {
      setIsPostDetailsOpen(!isPostDetailsOpen);
    }
  }

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
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
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

        {isPostDetailsOpen && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
