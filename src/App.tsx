import React, { useCallback, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const handleSelectedPost = useCallback((id: number) => {
    if (selectedPostId === id) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(id);
    }
  }, [selectedPostId]);

  const handleSelectedUser = useCallback((id: string) => {
    setSelectedUser(id);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          selectedUser={selectedUser}
          handleSelectedUser={handleSelectedUser}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUser={selectedUser}
            handleSelectedPost={handleSelectedPost}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
