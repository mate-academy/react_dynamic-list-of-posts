/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { SelectUser } from './components/SelectUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectUserResetPost = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostId(0);
    setSelectedUserId(+event.target.value);
  };

  const openClosePost = (postId: number) => (
    postId !== selectedPostId
      ? setSelectedPostId(postId)
      : setSelectedPostId(0)
  );

  return (
    <div className="App">
      <header className="App__header">
        <SelectUser
          selectedUserId={selectedUserId}
          selectUserResetPost={selectUserResetPost}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={selectedUserId}
            selectedPostId={selectedPostId}
            openClosePost={openClosePost}
          />
        </div>

        {selectedPostId > 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
