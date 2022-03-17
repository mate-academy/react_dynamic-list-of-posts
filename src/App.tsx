import React, { useEffect, useState } from 'react';
import { getPosts, getUserPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  // eslint-disable-next-line no-console
  console.log('app re');

  const fetchPosts = async () => {
    setPostsLoading(true);
    setPosts(await getPosts());
    setPostsLoading(false);
  };

  const fetchUserPosts = async () => {
    setPostsLoading(true);
    setPosts(await getUserPosts(selectedUserId));
    setPostsLoading(false);
  };

  useEffect(() => {
    if (selectedUserId === 0) {
      fetchPosts();
    } else {
      fetchUserPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {postsLoading
            ? <p>Loading posts...</p>
            : (
              <PostsList
                posts={posts}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            )}
        </div>

        <div className="App__content">
          {selectedPostId === 0
            ? <p>Select post to see details</p>
            : <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
