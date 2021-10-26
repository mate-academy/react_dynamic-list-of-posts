import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [userId, addUserId] = useState('0');
  const [postId, addPostId] = useState<number | null>(null);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelector">
          Select a user: &nbsp;
          <select
            onChange={(event) => addUserId(event.target.value)}
            value={userId}
            className="App__user-selector"
            id="userSelector"
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
            getPostId={(value) => addPostId(value)}
          />
        </div>

        <div className="App__content">
          {postId && <PostDetails postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
