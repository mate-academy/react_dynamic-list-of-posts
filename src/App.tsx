import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [selectedUser, selectUser] = useState(0);
  const [posts, setPosts] = useState([] as Post[]);
  const [selectedPostId, selectPost] = useState(0);
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    getUsers()
      .then(serverUsers => setUsers(serverUsers));
  }, []);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(serverPosts => setPosts(serverPosts));
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => selectUser(+event.target.value)}
            value={selectedUser}
          >
            <option value="0">All users</option>
            {
              users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            openPost={selectPost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
