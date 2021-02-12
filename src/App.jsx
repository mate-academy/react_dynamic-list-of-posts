/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUsers } from './api/api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const [selectOption, setSelectOption] = useState('0');
  const [filtered, setFiltered] = useState([]);
  const [users, setUsers] = useState([]);

  console.log(users)

  useEffect(() => {
    getPosts()
      .then(posts => {
        setPosts(posts);
      });
  }, []);

  useEffect(() => {
    getUsers()
      .then(users => setUsers(users));
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(post => (
      post.userId === Number(selectOption)
    ));
    setFiltered(filteredPosts);

  }, [selectOption]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            value={selectOption}
            onChange={(e) => setSelectOption(e.target.value)}
            className="App__user-selector"
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">

          <PostsList
            posts={filtered.length > 0 ? filtered : posts}
            selectedPostId={postId}
            selectPost={(postId) => setPostId(postId)}
          />
        </div>

        {postId !== 0 && (
          <div className="App__content">
            <PostDetails
              post={posts.find(post => post.id === postId)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
