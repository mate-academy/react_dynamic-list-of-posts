import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    const addPosts = async() => setPosts(await getUserPosts(userId));

    addPosts();
  }, [userId]);

  const handleChange = (event) => {
    setUserId(Number(event.target.value));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            onChange={handleChange}
            value={userId}
            className="App__user-selector"
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
            setSelectedPostId={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails selectedPostId={selectedPostId} />
            ) : (
              <h2>Please choose post</h2>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
