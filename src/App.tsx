import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [posts, setPosts] = useState<Post[] | null>([]);

  const loadUserPosts = useCallback(
    async (id: number) => {
      setPosts(await getUserPosts(id));
    }, [userId],
  );

  useEffect(
    () => {
      loadUserPosts(0);
    }, [],
  );

  const handleUserSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setUserId(+event.target.value);
    }, [userId],
  );

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={(event) => {
              loadUserPosts(+event.target.value);
              handleUserSelect(event);
            }}
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
          {
            posts && (
              <PostsList posts={posts} />
            )
          }
        </div>

        <div className="App__content">
          <PostDetails post={{
            id: 1,
            createdAt: 'hgkkgkhghg',
            updatedAt: 'jyghjgfhjgfj',
            userId,
            title: 'hjvhjvhvbhjnvb',
            body: 'jhghjghjg',
          }}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
