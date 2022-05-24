import React, { useState } from 'react';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';

import './App.scss';
import './styles/general.scss';

const App: React.FC<{}> = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);

  return (
    <div className="App">
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedPostId={selectedPostId}
            setSelectedPostId={setSelectedPostId}
          />
        </div>
        {!!selectedPostId && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
