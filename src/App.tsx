import React, { useState } from 'react';
// Styles
import './App.scss';
import './styles/general.scss';
// Components
import { UserSelect } from './components/UserSelect';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
// Types
import { ChangeId } from './types/ChangeId';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const changeUserId: ChangeId = (userId) => {
    setSelectedUserId(userId);
  };

  const changePostId: ChangeId = (postId) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect changeUserId={changeUserId} changePostId={changePostId} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onChangePostId={changePostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
