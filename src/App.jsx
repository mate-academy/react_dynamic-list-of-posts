import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState('');
  // ??? const [selectedUserId, setSelectedUserId] = useState('')

  useEffect(() => {
    getPosts()
      .then(result => setPosts(result));
  }, []);

  const handleChange = (event) => {
    getPosts(event.target.value)
      .then(result => setPosts(result));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => handleChange(event)}
          >
            <option value="">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && (
            <PostDetails selectedPostId={selectedPostId} />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
