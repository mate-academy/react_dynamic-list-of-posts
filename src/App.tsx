import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect onSelect={handleChange} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUserId}
            selectedPostId={selectedPostId}
            selectedPost={setSelectedPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails
              selectedPostId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
