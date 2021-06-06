import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';
// import { post } from './api/api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data));
    getUsers()
      .then(data => setUsers(data));
  }, []);

  const selectedUserPosts = ({ target }) => {
    if (+target.value === 0) {
      getPosts()
        .then(data => setPosts(data));
    }

    getUserPosts(target.value)
      .then(data => setPosts(data));
  };

  const setSelectPost = (postId) => {
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
            onChange={selectedUserPosts}
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
            posts={posts}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
            setSelectPost={setSelectPost}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails selectedPostId={selectedPostId} />
            )
            : 'No selected post'
          }
        </div>
      </main>
    </div>
  );
};

export default App;
