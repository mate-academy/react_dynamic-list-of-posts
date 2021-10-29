import { FC, useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { getUsers } from './api/posts';

const App: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [selectedUserPostId, setSelectedUserPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(usersList => setUsers(usersList));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={users}
          currentUserId={currentUserId}
          onChangeUserId={setCurrentUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            currentUserId={currentUserId}
            postId={selectedUserPostId}
            onChangePostId={setSelectedUserPostId}
          />
        </div>
        {selectedUserPostId > 0 && (
          <div className="App__content">
            <PostDetails postId={selectedUserPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
