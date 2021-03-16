import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';
import { Loader } from './components/Loader';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedUserId) {
      loadAllPosts();

      return;
    }

    loadUserPosts(selectedUserId);
  }, [selectedUserId]);

  const loadAllPosts = async() => {
    setLoading(true);
    const loadedPosts = await getAllPosts();

    setPosts(loadedPosts);
    setLoading(false);
  };

  const loadUserPosts = async(userId) => {
    setLoading(true);
    const loadedPosts = await getUserPosts(userId);

    setLoading(false);
    setPosts(loadedPosts);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSelectedUserId(+value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={handleChange}
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
          {loading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                setPostId={setSelectedPostId}
                postId={selectedPostId}
              />
            )
          }
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
