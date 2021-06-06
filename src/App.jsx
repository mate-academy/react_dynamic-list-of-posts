import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import users from './api/users.json';

let resievedPosts;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    getPosts()
      .then((result) => {
        resievedPosts = result;
        setPosts(resievedPosts);
      });
  }, []);

  const sortPostsByUser = (id) => {
    if (id === 0) {
      return setPosts(resievedPosts);
    }

    return getUserPosts(id)
      .then(result => setPosts(result));
  };

  const selectPost = (id) => {
    if (id === selectedId) {
      return setSelectedId(0);
    }

    return setSelectedId(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(ev) => {
              sortPostsByUser(+ev.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
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
            selectedId={selectedId}
            selectPost={selectPost}
          />
        </div>

        <div className="App__content">
          {selectedId ? (
            <PostDetails selectedId={selectedId} />
          )
            : 'There is not the selected post'
          }
        </div>
      </main>
    </div>
  );
};

export default App;
