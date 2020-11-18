import React, { useCallback, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const handleUserSelect = (event) => {
    setSelectedUserId(+event.target.value);
  };

  const choosePost = (postId) => {
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
          handleUserSelect={handleUserSelect}
          selectedUserId={selectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            choosePost={choosePost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId === 0
            ? <h4>Choose a post</h4>
            : <PostDetails postId={selectedPostId} />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
