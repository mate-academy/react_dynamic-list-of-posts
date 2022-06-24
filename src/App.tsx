import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './react-app-env';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState('0');
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={currentUser}
            onChange={(event) => {
              setCurrentUser(event.target.value);
              setIsLoading(true);
            }}
          >
            <option value="0" disabled>All users</option>
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
          {isLoading && <Loader />}
          <PostsList
            userSelectedId={currentUser}
            selectPost={setSelectedPost}
            post={selectedPost}
            setIsLoading={setIsLoading}
          />
        </div>

        <div className="App__content">
          <PostDetails
            post={selectedPost}
            setIsLoading={setIsLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
