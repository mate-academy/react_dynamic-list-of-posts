import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { UserSelect } from './components/UserSelect';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';


const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectUser = useCallback((event) => {
    setSelectedUserId(+event.target.value);
  }, []);

  const selectPost = useCallback((postId) => {
    if (postId === selectedPostId) {
      setSelectedPostId(0);
      return;
    }
    setSelectedPostId(postId);
  }, [selectedPostId]);

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
          <PostDetails
            selectedPostId={selectedPostId}
          />
        </div>
      </main>
    </div>
  )
};

export default App;
