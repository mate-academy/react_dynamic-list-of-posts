import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectPostId, setSelectPostId] = useState(0);

  useEffect(() => {
    getUserPosts(0).then(data => setPosts(data));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          setPosts={setPosts}
          posts={posts}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectPostId={selectPostId}
            setSelectPostId={setSelectPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails selectPostId={selectPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
