import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let result = await getUserPosts(userId);

      if (userId === 0) {
        result = await getPosts();
      }

      setPosts(result);
    };

    fetchData();
  }, [userId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            onChange={event => setUserId(Number(event.target.value))}
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
            postId={postId}
            selectPost={(id: number) => {
              setPostId(id);
            }}
          />
        </div>

        <div className="App__content">
          {postId > 0 && (
            <PostDetails postId={postId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
