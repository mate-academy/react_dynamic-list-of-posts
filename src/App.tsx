import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [selectPostId, setSelectPostId] = useState<number>(0);

  const getSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const getSelectPostId = (postId: number) => {
    setSelectPostId(postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          getSelectUser={getSelectUser}
          selectedUserId={selectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            getSelectPostId={getSelectPostId}
            selectPostId={selectPostId}
          />
        </div>

        <div className="App__content">
          {selectPostId && (
            <PostDetails
              selectPostId={selectPostId}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
