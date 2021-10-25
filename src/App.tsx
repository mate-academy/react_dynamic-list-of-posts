import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect setUser={setSelectedUserId} />
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
            )
            : <div className="App__post">Select post</div>}
        </div>
      </main>
    </div>
  );
};

export default App;
