import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [postId, setPostId] = useState(0);
  const [isSelectedPost, setIsSelectedPost] = useState(false);
  const [userId, setUserId] = useState(0);

  const selectedPostId = (isPostIdSelected, selectedPostId) => {
    setIsSelectedPost(isPostIdSelected);
    setPostId(selectedPostId);
  };

  const handleUserSelect = (event) => {
    const { value } = event.target;

    setUserId(value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => handleUserSelect(event)}
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
            userId={userId}
            selectedPostId={selectedPostId}
          />
        </div>

        {isSelectedPost && (
          <div className="App__content">
            <PostDetails
              postId={postId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
