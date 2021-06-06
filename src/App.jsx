import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

const App = () => {
  const [selectedUserId, setUserId] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect setUserId={setUserId} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList selectedUserId={selectedUserId} setPostId={setPostId} />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
