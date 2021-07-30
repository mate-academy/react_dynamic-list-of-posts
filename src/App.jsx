import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';

const App = () => {
  const [selectedUserId, selectUser] = useState('0');
  const [posts, showPosts] = useState([]);

  useEffect(async() => showPosts(await getAllPosts()), []);
  useEffect(async() => {
    if (selectedUserId === '0') {
      showPosts(await getAllPosts());
    } else {
      showPosts(await getUserPosts(Number(selectedUserId)));
    }
  }, [selectedUserId]);

  const changeSelectedUser = (event) => {
    selectUser(event.target.value);
    // if (selectedUserId === '0') {
    //   showPosts(await getAllPosts());
    // } else {
    //   showPosts(await getUserPosts(Number(selectedUserId)));
    // }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={changeSelectedUser}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList posts={posts} />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
