import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    async function inner() {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer.slice(0, 10));
    }

    inner();
  }, []);

  const handleUserSelect = (event) => {
    setSelectedUserId(+event.target.value);
  };

  const choosePost = (postId) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);

      return;
    }

    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleUserSelect}
          >
            <option value="0">All users</option>
            {users.map((user, index) => (
              <option value={index + 1} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            choosePost={choosePost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId === 0
            ? <h4>Choose post first to see details</h4>
            : <PostDetails postId={selectedPostId} />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
