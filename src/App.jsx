import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';

const App = () => {
  const [selectedPostId, setPostId] = useState(0);
  const [postIdCheck, updatepostIdCheck] = useState(false);
  const [selectedUserId, setUserId] = useState(0);
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const result = await getUserPosts(selectedUserId);

      updatePosts(result);
    };

    fetchPosts();
  }, [selectedUserId]);

  const handleClick = (postId, action) => {
    switch (action) {
      case 'Open':
        setPostId(postId);
        updatepostIdCheck(true);
        break;
      case 'Close':
        setPostId(0);
        updatepostIdCheck(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => setUserId(+event.target.value)}
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
            handleClick={handleClick}
            postIsOpened={postIdCheck}
            activePostId={selectedPostId}
            posts={posts}
          />
        </div>

        <div className="App__content">
          {postIdCheck && (
            <PostDetails
              selectedUserId={selectedUserId}
              postId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
