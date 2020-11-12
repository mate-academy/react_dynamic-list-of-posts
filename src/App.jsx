import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
// test for merge

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, selectUser] = useState('All');
  const [selectedPost, selectPost] = useState(null);

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await getUsers();

      setUsers(response);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await getUserPosts(selectedUser);

      setPosts(response);
    };

    fetchPosts();
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            value={selectedUser}
            className="App__user-selector"
            onChange={event => selectUser(event.target.value)}
          >
            <option value="All">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">

          <PostsList
            posts={posts}
            selectPost={selectPost}
            selectedPost={selectedPost}
          />
        </div>

        <div className="App__content">
          {selectedPost ? <PostDetails postId={selectedPost} /> : 'Select post'}
        </div>
      </main>
    </div>
  );
};

export default App;
