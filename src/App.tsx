import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [postDisplayed, setPostDisplay] = useState(false);
  const [currentUserID, setCurrentUserID] = useState('');
  const [currenPostID, setCurrentPostID] = useState(0);
  const handleCloseOpen = (id: number) => {
    if (id === currenPostID) {
      setCurrentPostID(0);
    } else {
      setCurrentPostID(id);
    }
  };

  useEffect(() => setPostDisplay(true), []);

  return (
    <div className="App">
      <header className="App__header">
        <label
          htmlFor="userSelect"
        >
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={({ target: { value } }) => {
              setCurrentUserID(value);
            }}
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
          {postDisplayed && (
            <PostsList
              selectedPostID={currenPostID}
              selectedUserID={currentUserID}
              selectCurrentPostID={handleCloseOpen}
            />
          )}
          {!postDisplayed
            ? 'Posts loading...'
            : ''}
        </div>

        <div className="App__content">
          <PostDetails postID={currenPostID} />
        </div>
      </main>
    </div>
  );
};

export default App;
