import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');
  const [showPostDetails, setShowPostDetails] = useState(false);

  const selectUserHandler = (userId: string) => {
    setCurrentUser(userId);
    setShowPostDetails(false);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            defaultValue="DEFAULT"
            onChange={e => selectUserHandler(e.target.value)}
          >
            <option value="DEFAULT" disabled>Choose...</option>
            <option value="All">All users</option>
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
        {currentUser && (
          <div className="App__sidebar">
            <PostsList
              currentUser={currentUser}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
              setShowPostDetails={setShowPostDetails}
            />
          </div>
        )}

        <div
          className={classNames(
            'App__content',
            { 'App__content--hidden': !showPostDetails },
          )}
        >
          { selectedPostId && (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
