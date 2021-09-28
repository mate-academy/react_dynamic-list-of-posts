import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect onSelect={handleSelect} />
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
