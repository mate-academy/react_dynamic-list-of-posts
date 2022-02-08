import React, { useCallback, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { SelectOfUsers } from './components/SelectOfUsers/SelectOfUsers';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);

  const selectUserId = useCallback((id:string) => {
    setSelectedUserId(id);
  }, []);

  const selectPostId = useCallback((id:number) => {
    setSelectedPostId(id);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <SelectOfUsers selectId={selectUserId} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectPostId={selectPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
