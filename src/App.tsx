import React, { useEffect, useState, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { loadPosts } from './api/api';
import { Post } from './types';

type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const onSelectPost = useCallback((post: Post) => {
    setSelectedPost(post);
  }, []);

  useEffect(() => {
    loadPosts()
      .then(response => setPosts(response));
  }, []);

  const filterPosts = useCallback(async (id) => {
    const loadedPosts = await loadPosts();

    const filteredPosts = loadedPosts.filter((post: Post) => post.userId === id);

    setPosts(filteredPosts);
  }, []);

  useEffect(() => {
    if (userId === 0) {
      loadPosts()
        .then(response => setPosts(response));
      return;
    }

    filterPosts(userId);

    setSelectedPost(null);
  }, [userId]);

  const handleUserSelect = useCallback((event: SelectEvent) => {
    setUserId(+event.target.value);
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        Select a user: &nbsp;
        <select
          value={userId}
          className="App__user-selector"
          onChange={handleUserSelect}
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
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          {posts.length !== 0 && (
            <PostsList
              onPostSelect={onSelectPost}
              selectedPost={selectedPost}
              posts={posts}
            />
          )}
        </div>

        <div className="App__content">
          {selectedPost && (
            <PostDetails
              selectedPost={selectedPost}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App;
