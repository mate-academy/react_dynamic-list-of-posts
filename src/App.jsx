import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

import { request } from './api/api';
import { getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    request('/posts')
      .then(result => setPosts(result));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          setSelectedUserId={setSelectedUserId}
          selectedPostId={selectedPostId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={getUserPosts(posts, +selectedUserId)}
            setId={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails
              postId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
