import * as React from 'react';
import './App.scss';
import './styles/general.scss';
import { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts } from './api/posts';
import { Post } from './react-app-env';

const App: React.FC = () => {
  const [id, setId] = useState<number>(-1);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const postsFromApi = await getPosts();

      setPosts(postsFromApi);
    })();
  }, []);

  const setNewId = (newId: number) => {
    setId(newId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={async (event) => setPosts(await getPosts(+event.target.value))}
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
        {posts
          ? (
            <div className="App__sidebar">
              <PostsList posts={posts} setNewId={setNewId} />
            </div>
          )
          : ''}

        <div className="App__content">
          <PostDetails selectedId={id} />
        </div>
      </main>
    </div>
  );
};

export default App;
