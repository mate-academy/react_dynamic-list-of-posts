import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getAllUsers } from './api/posts';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromServer = await getAllUsers();

      setUsers(usersFromServer);
    };

    fetchUsers();
  }, []);

  const selectPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const clearPostId = () => {
    setSelectedPostId(0);
  };

  const selectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={`${selectedUserId}`}
            onChange={selectUserId}
          >
            <option key="0" value="">All users</option>
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
            selectedPost={selectedPostId}
            selectedUser={selectedUserId}
            selectPost={selectPostId}
            clearPost={clearPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (<PostDetails postId={selectedPostId} />)
            : <p>No post selected</p>}
        </div>
      </main>
    </div>
  );
};

export default App;
