import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [selectedUser, setUser] = useState('All users');
  const [selectedPostId, setPost] = useState(0);

  const handleUser = (newValue) => {
    setUser(newValue);
  };

  const handlePost = (postId) => {
    selectedPostId === postId
      ? setPost(0)
      : setPost(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={(event) => {
              handleUser(event.target.value);
            }}
          >
            <option value="All users">All users</option>
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
            selectedUser={selectedUser}
            selectedPostId={selectedPostId}
            handlePost={handlePost}
          />
        </div>

        {!!selectedPostId
          && (
            <div className="App__content">
              <PostDetails
                selectedPostId={selectedPostId}
              />
            </div>
          )
        }
      </main>
    </div>
  );
};

export default App;
