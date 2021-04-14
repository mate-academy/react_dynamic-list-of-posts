import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUsers, getUserPosts } from './api/api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);

  useEffect(() => {
    if (selectedUser !== 0) {
      getUserPosts(selectedUser).then(setPosts);
    } else {
      getPosts().then(setPosts);
    }
  }, [selectedUser]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const sortedUsers = users.sort((previous, next) => (previous.id - next.id));

  const selectPost = (PostId) => {
    setSelectedPostId(PostId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setSelectedUser(Number(event.target.value))}
          >
            <option value={0}>
              All
            </option>
            {sortedUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
                {' '}
                User #
                {user.id}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectPost={selectPost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
          <PostDetails
            selectedPostId={selectedPostId}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
