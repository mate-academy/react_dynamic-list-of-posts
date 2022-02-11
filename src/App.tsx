import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import * as usersAPI from './api/users';

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const usersFromServer = await usersAPI.getAllUsers();

      setUsers(usersFromServer);
    };

    loadData();
  }, []);

  const selectedPostHandler = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelect">
          Select a user: &nbsp;

          <select
            id="userSelect"
            className="App__user-selector"
            onChange={(event) => (
              setSelectedUser(+event.target.value)
            )}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPost?.id}
            selectedUser={selectedUser}
            selectedPostHandler={selectedPostHandler}
          />
        </div>

        <div className="App__content">
          {
            selectedPost
            && (
              <PostDetails
                selectedPost={selectedPost}
              />
            )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
