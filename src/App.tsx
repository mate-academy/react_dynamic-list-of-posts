import React, { useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect setCurrentUser={setSelectedUserId} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectPost={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails
                selectedPostId={selectedPostId}
              />
            ) : (<h2>Select post</h2>)}
        </div>
      </main>
    </div>
  );
};

export default App;
