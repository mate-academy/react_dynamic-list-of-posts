import React, { useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const handleUserSelect = (event) => {
    setSelectedUserId(+event.target.value);
  }

  return (
    <div className="App">
      <UserSelect
        changeHandler={handleUserSelect}
        selectedUser={selectedUserId}
      />
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
          />
        </div>
        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  )
};

export default App;
