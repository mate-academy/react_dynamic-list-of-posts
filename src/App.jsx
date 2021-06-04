import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import users from './api/users.json';

let initialPosts;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then((result) => {
        initialPosts = result;
        setPosts(initialPosts);
      });
  }, []);

  const sortPostsByUser = (userId) => {
    if (userId === 0) {
      return setPosts(initialPosts);
    }

    return getUserPosts(userId)
      .then(result => setPosts(result));
  };

  const selectPost = (postId) => {
    if (postId === selectedPostId) {
      return setSelectedPostId(0);
    }

    return setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              sortPostsByUser(+event.target.value);
            }}
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
            posts={posts}
            selectedPostId={selectedPostId}
            selectPost={selectPost}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails selectedPostId={selectedPostId} />
            )
            : 'There is not the selected post'
          }
        </div>
      </main>
    </div>
  );
};

export default App;
