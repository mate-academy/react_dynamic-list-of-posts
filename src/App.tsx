import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/api';
import { Post } from './types/Post';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setpostId] = useState(0);

  const loadPosts = () => {
    getUserPosts(userId)
      .then(setPosts);
  };

  useEffect(() => loadPosts(), [userId]);

  const postTitle = posts.find(post => post.id === postId)?.title;

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="select"
            value={userId}
            onChange={(event) => setUserId(+event.target.value)}
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
            setpostId={setpostId}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postTitle
            ? (
              <PostDetails
                postId={postId}
                body={postTitle}
              />
            ) : (
              'Select post!'
            )}

        </div>
      </main>
    </div>
  );
};

export default App;
