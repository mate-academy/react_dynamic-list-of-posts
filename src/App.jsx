import React, { useEffect, useState } from 'react';

import { getUsers } from './api/users';
import { getPosts, getUsersPosts } from './api/posts';

import { PostsList } from './components/PostsList';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';

import './App.scss';
import './styles/general.scss';

const App = () => {
  const [posts, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setUserId] = useState(0);
  const [selectedPostId, getSelectedPostId] = useState(0);

  useEffect(() => {
    if (+selectedUserId === 0) {
      getPosts().then(setPost);
      getSelectedPostId(0);
    } else {
      getUsersPosts(selectedUserId).then(setPost);
      getSelectedPostId(0);
    }
  }, [selectedUserId]);

  useEffect(() => {
    getUsers()
      .then(result => result.sort((a, b) => a.id - b.id))
      .then(setUsers);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setUserId(event.target.value)}
          >
            <option value="0">Select a user</option>
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
            posts={posts}
            activePost={selectedPostId}
            getActivePost={getSelectedPostId}
          />
        </div>

        <div className="App__content">
          { +selectedPostId !== 0 && (!selectedPostId
            ? <Loader />
            : <PostDetails selectedPostId={selectedPostId} />)}
        </div>
      </main>
    </div>
  );
};

export default App;
