import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { getAllPosts, getAllUsers, getUserPosts } from './api/posts';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getAllPosts()
      .then(data => setPosts(data));
    getAllUsers()
      .then(data => setUsers(data));
  }, []);

  const selectUserPosts = ({ target }) => {
    if (+target.value === 0) {
      getAllPosts()
        .then(data => setPosts(data));
    }

    getUserPosts(target.value)
      .then(data => setPosts(data));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectUserPosts}
          >
            <option value="0">All users</option>

            {users.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId > 0 ? (
            <PostDetails selectedPostId={selectedPostId} />
          ) : (
            <h2>
              Open a post
              <br />
              to see more details
            </h2>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
