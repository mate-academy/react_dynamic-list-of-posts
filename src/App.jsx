import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { UserSelect } from './components/UserSelect';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const updatePosts = (id) => {
    getUserPosts(id)
      .then(list => setPosts(list));
  };

  useEffect(() => {
    updatePosts('0');
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect changeUser={updatePosts} />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            setSelection={setPostId}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {
            postId
              ? <PostDetails postId={postId} />
              : ''
          }
        </div>
      </main>
    </div>
  );
};

export default App;
