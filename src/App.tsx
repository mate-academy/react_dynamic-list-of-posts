import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UsersList } from './components/UsersList';

const App: React.FC = () => {
  const [postId, setPostId] = useState(0);
  const [selectorValue, setSelectorValue] = useState(0);

  const handleOpenPostDetails = async (id: number) => {
    setPostId(id);
  };

  const handleSelector = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectorValue(+event.target.value);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        Select a user: &nbsp;
        <UsersList
          selectorValue={selectorValue}
          handleSelector={handleSelector}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectorValue={selectorValue}
            handleOpenPostDetails={handleOpenPostDetails}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postId !== 0 && (
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
