import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { getUserPosts } from './api/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, updatePosts] = useState([]);
  const [selectedPostId, setPostId] = useState(0);
  const [selectedUserId, setUserId] = useState(0);
  const [postIsSelected, updatePostSelect] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      const result = await getUserPosts(selectedUserId);

      updatePosts(result);
    };

    fetchData();
  }, [selectedUserId]);

  const handlePostSelection = (postId, action) => {
    switch (action) {
      case 'open':
        setPostId(postId);
        updatePostSelect(true);
        break;
      case 'close':
        setPostId(0);
        updatePostSelect(false);
        break;
      default:
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
            posts={posts}
            handleClick={handlePostSelection}
            postIsOpened={postIsSelected}
            activePostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {postIsSelected && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
