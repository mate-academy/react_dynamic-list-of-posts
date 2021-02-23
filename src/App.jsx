import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App = () => {
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          userId={userId}
          setUserId={setUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && (
          <PostDetails
            postId={selectedPostId}
          />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
