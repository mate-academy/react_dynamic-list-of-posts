import React, { useState } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { SelectUser } from './components/SelectUser';

import './App.scss';
import './styles/general.scss';

const App = () => {
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <div className="App">
      <header className="App__header">
        <SelectUser
          userId={userId}
          setUserId={setUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            postId={selectedPostId}
            setPostId={setSelectedPostId}
          />
        </div>

        {selectedPostId && (
          <div className="App__content">
            <PostDetails postId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
