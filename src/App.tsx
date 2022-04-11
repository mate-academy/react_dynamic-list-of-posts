import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelect/UserSelect';
import { getUsers } from './api/api';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  // eslint-disable-next-line no-console
  console.log(selectedPostId);
  // eslint-disable-next-line no-console
  console.log(selectUserId);

  useEffect(() => {
    getUsers()
      .then(user => setUsers(user));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelector
          users={users}
          selectUserId={setSelectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectUserId={selectUserId}
            selectPostId={selectedPostId}
            setSelectPostId={setSelectedPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails postId={selectedPostId} />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
