import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect setPosts={setPosts} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectPost={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? <PostDetails postId={selectedPostId} />
            : <p>Select a post</p>}
        </div>
      </main>
    </div>
  );
};

export default App;
