import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadAllPosts = () => {
    getPosts()
      .then((posts) => {
        setFilteredPosts(posts);
      });
  };

  const loadUsers = () => {
    getUsers()
      .then(usersArr => usersArr.filter(user => user.id && user.name))
      .then(setUsers);
  };

  useEffect(() => {
    loadAllPosts();
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getUserPosts(selectedUserId)
        .then(setFilteredPosts);
    } else {
      loadAllPosts();
    }
  }, [selectedUserId]);

  const selectPost = (postId) => {
    if (selectedPostId !== postId) {
      setSelectedPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={filteredPosts}
            selectedPostId={selectedPostId}
            selectPost={selectPost}
          />
        </div>
        <div className="App__content">
          {selectedPostId > 0 && (
            <PostDetails postId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
