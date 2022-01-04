import React, { useState, useEffect } from 'react';
import { getUsers } from './api/posts';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { UserSelect } from './components/UserSelect/UserSelect';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(gotUsers => setUsers(gotUsers));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          currentUserId={currentUserId}
          selectUserId={setCurrentUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={currentUserId}
            selectedPostId={selectedPostId}
            selectPost={setSelectedPostId}
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
