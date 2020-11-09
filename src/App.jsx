import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { SelectUser } from './components/SelectUser/SelectUser';

const App = () => {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentPostId, setCurrentPostId] = useState(0);

  const handleUserSelect = useCallback((event) => {
    setCurrentUserId(+event.target.value);
  }, []);

  const changePost = (postId) => {
    if (postId === currentPostId) {
      setCurrentPostId(0);

      return;
    }

    setCurrentPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <SelectUser
          currentUserId={currentUserId}
          handleUserSelect={handleUserSelect}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            currentUserId={currentUserId}
            currentPostId={currentPostId}
            changePost={changePost}
          />
        </div>

        <div className="App__content">
          {currentPostId ? (
            <PostDetails currentPostId={currentPostId} />
          ) : (
            <h4>Open any post to see it&apos;s details</h4>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
