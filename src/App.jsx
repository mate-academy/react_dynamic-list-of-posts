import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

import { getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getUserPosts(+selectedUserId, setPosts);
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          setSelectedUserId={setSelectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            setId={setSelectedPostId}
            selectedPostId={selectedPostId}
            setLoading={setLoading}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails
              postId={selectedPostId}
              isLoading={isLoading}
              setLoading={setLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default React.memo(App);
