import React, {useState, useEffect} from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setPost] = useState(0);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setSelectedUser(event.target.value)}
          >
            <option value="0">All users</option>
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
            selectedUser={selectedUser}
            postEdited={setPost}
            selectedPost={selectedPost}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPost} />
        </div>
      </main>
    </div>
  );
};

export default App;
