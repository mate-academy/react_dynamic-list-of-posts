import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './react-app-env';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const [count, setCount] = useState(0);

  const loadPosts = async () => {
    const loadedPosts = await getUserPosts(selectedUserId);

    setPosts(loadedPosts);
  };

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  const selectPostHandler = useCallback(
    (postId: number) => {
      setSelectedPostId(postId);
    },
    [selectedPostId],
  );

  return (
    <div className="App">
      <header className="App__header">
        <button
          type="button"
          onClick={() => setCount((state) => state + 1)}
        >
          {count}
        </button>
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
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
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
            onSelectPost={selectPostHandler}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
