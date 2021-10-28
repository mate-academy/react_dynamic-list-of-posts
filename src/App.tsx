import React, { ChangeEvent, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [selectedPostId, setPostId] = useState<number>(0);

  const handleUserSelect = (e: number) => {
    setSelectedUser(e);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleUserSelect(+e.target.value);
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
          <PostsList
            userId={selectedUser}
            selectedPostId={selectedPostId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
