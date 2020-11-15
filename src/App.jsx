import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails } from './api/posts';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postDetails, setPostDetails] = useState(null);

  const getSelectedPostId = (postId) => {
    getPostDetails(postId)
      .then(post => setPostDetails(post));

    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setSelectedUserId(event.target.value)}
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
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={selectedUserId}
            getSelectedPostId={getSelectedPostId}
            postId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {
            postDetails ? (
              <PostDetails post={postDetails} />
            )
              : (
                <p>No post selected</p>
              )
          }
        </div>
      </main>
    </div>
  );
};

export default App;
