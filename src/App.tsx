import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect selectUser={handleSelect} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectPost={setPostId}
            selectPostId={postId}
            selectUserId={userId}
          />
        </div>

        <div className="App__content">
          {postId !== 0 && (
            <PostDetails selectPostId={postId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
