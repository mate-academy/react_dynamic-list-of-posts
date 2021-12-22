import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [user, setUser] = useState(0);
  const [selectedPostId, setPostId] = useState(0);

  const loadPosts = async () => {
    let loadedPosts;

    if (user === 0) {
      loadedPosts = await getPosts();

      setPosts(loadedPosts);
    } else {
      loadedPosts = await getUserPosts(user);
    }

    setPosts(loadedPosts);
  };

  useEffect(() => {
    loadPosts();
  }, [user]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = +event.target.value;

    setUser(userId);
  };

  const handleSetPostId = (postId: number) => {
    let useId = postId;

    if (postId === selectedPostId) {
      useId = 0;
    }

    setPostId(useId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="users">
          Select a user: &nbsp;

          <select
            id="users"
            value={user}
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
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            setPostId={handleSetPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
