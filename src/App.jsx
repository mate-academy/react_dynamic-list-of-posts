import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPost, setSelectedPost] = useState(0);

  const selectUser = useCallback((event) => {
    setSelectedUser(+event.target.value);
  }, []);

  const selectedUSerId = (id) => {
    setSelectedPost(id);
  };

  const resetUSer = () => {
    setSelectedPost(0);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          selectedUser={selectedUser}
          onSelectUser={selectUser}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            selectedUSerId={selectedUSerId}
            selectedPost={selectedPost}
            resetUSer={resetUSer}
          />
        </div>

        <div className="App__content">
          <PostDetails
            selectedPost={selectedPost}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
