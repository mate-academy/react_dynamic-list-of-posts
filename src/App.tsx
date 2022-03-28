import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [postId, setPostId] = useState(0);

  const fetchPosts = async () => {
    const postsFromSever = await getUserPosts(selectedUserId);

    setPosts(postsFromSever);
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedUserId]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (+event.target.value !== selectedUserId) {
      setSelectedUserId(+event.target.value);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleSelect}
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
            setPostId={setPostId}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postId !== 0
            && <PostDetails postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
