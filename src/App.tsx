/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post } from './types/types';
import { getUserPosts } from './api/post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const loadedPosts = await getUserPosts();

      setPosts(loadedPosts);
      setSelectedPosts(loadedPosts);
    }

    loadPosts();
  }, []);

  function selectUser(value: string) {
    setSelectedUser(Number(value));

    if (!Number(value)) {
      setSelectedPosts(posts);
    } else {
      setSelectedPosts(posts.filter(post => post.userId === Number(value)));
    }
  }

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={(event) => selectUser(event.target.value)}
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
          <PostsList posts={selectedPosts} onSelect={setSelectedPost} />
        </div>

        <div className="App__content">
          <PostDetails
            post={selectedPost}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
