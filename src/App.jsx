import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getAllPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    if (userId === 0) {
      getAllPosts().then(setPosts);
    } else {
      getUserPosts(userId).then(setPosts);
    }

    getUsers().then(setUsers);
  }, [userId]);

  const setPostId = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={e => setUserId(+e.target.value)}
          >
            <option value="0">All users</option>
            {
              users.map(user => (
                user.id <= 10
                  && (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  )
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onSelectedPost={setPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {
            selectedPostId !== 0
              && (
                <PostDetails
                  selectedPostId={selectedPostId}
                />
              )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
