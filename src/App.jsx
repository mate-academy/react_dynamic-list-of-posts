import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setPostId] = useState(0);

  useEffect(() => {
    getPosts().then(setPosts);
    getUsers().then(setUsers);
  }, []);

  const selectUserPosts = ({ target }) => {
    if (+target.value === 0) {
      getPosts().then(setPosts);
    }

    getUserPosts(target.value).then(setPosts);
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
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId ? (
            <PostDetails selectedPostId={selectedPostId} />
          ) : (
            <h3>Open a post to see details</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
