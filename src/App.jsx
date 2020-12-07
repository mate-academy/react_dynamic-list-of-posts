import React, { useState, useCallback } from 'react';

import { UserSelect } from './components/UserSelect';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import './App.scss';
import './styles/general.scss';


const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectUser = useCallback((event) => {
    setSelectedUserId(+event.target.value);
  }, []);

  const selectPost = (postId) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
      return;
    }

    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          selectUser={selectUser}
          selectedUserId={selectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectPost={selectPost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
        {selectedPostId ? (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          ) : (
            <h4>Open a post to see details</h4>
          )}

        </div>
      </main>
    </div>
  )
};

export default App;
