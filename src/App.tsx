import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { Post, PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(receivedPosts => {
        setPosts(receivedPosts);

        setLoading(false);
      });
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="posts">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="posts"
            onChange={({ target }) => {
              setSelectedUserId(+target.value);
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
          <PostsList
            posts={posts}
            setSelectedPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
            loading={loading}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 ? (
            <PostDetails
              postId={selectedPostId}
            />
          ) : (
            'Select post'
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
