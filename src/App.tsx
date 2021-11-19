/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const [user, setUser] = useState<number>(0);
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    getUserPosts(user)
      .then(setPosts);
  }, [user, selectedPostId]);

  const selectUser = (id: number) => {
    setUser(id);
  };

  const selectPost = (id: number) => {
    setSelectedPostId(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          userId={user}
          selectUser={selectUser}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectPost={selectPost}
            selectedPostId={selectedPostId || 0}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails
                selectedPostId={selectedPostId || 0}
              />
            )
            : <h3>Pick a post to view details</h3>}
        </div>
      </main>
    </div>
  );
};

export default App;
