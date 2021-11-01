import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [postDetailsAreShown, setPostDetailsAreShown] = useState(false);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          selectedUserId={userId}
          setSelectedUserId={setUserId}
          setDetailsAreShown={setPostDetailsAreShown}
        />
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={userId}
            selectedPostId={postId}
            setSelectedPostId={setPostId}
            areDetailsShown={setPostDetailsAreShown}
            postDetailsAreShown={postDetailsAreShown}
          />
        </div>

        <div className="App__content">
          {postDetailsAreShown
            && (
              <PostDetails
                postId={postId}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
