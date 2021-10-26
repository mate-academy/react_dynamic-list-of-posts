import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const usersFromAPI = await getUsers();

      setUsers(usersFromAPI);
    })();
  }, []);

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId);
    setSelectedPostId(null);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          selectedUserId={selectedUserId}
          onUserChange={handleUserChange}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            onPostSelect={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId ? (
            <PostDetails
              postId={selectedPostId}
            />
          ) : (
            <h2>Select post to see details</h2>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
