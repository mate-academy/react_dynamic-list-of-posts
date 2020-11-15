import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { UserSelect } from './components/UserSelect/UserSelect';

const App = () => {
  const [selectedUser, setSelectedUser] = useState('All');
  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUser}
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? <PostDetails postId={selectedPostId} />
            : <h3>Select the post</h3>}
        </div>
      </main>
    </div>
  );
};

export default App;
