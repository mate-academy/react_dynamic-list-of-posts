import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [postDetailsVisibility, setPostDetailsVisibility] = useState(false);

  const selectPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const selectUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setPostDetailsVisibility(false);
    setSelectedPostId(0);
  };

  const changePostDetailsVisibility = () => {
    setPostDetailsVisibility(current => !current);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select-user">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="select-user"
            value={selectedUserId}
            onChange={selectUserId}
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
            selectedUserId={selectedUserId}
            selectPostId={selectPostId}
            changePostDetailsVisibility={changePostDetailsVisibility}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId && postDetailsVisibility && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
