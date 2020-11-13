import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [userSelectId, setUserSelectId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isVisiblePost, setStatusPost] = useState(false);

  const handleSelect = (event) => {
    setUserSelectId(Number(event.target.value));
  };

  const showPost = (post) => {
    if (post.id === selectedPostId) {
      setStatusPost(false);
      setSelectedPostId(null);

      return;
    }

    setSelectedPostId(post.id);
    setStatusPost(true);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            onChange={handleSelect}
            value={userSelectId}
            className="App__user-selector"
          >
            <option value={0}>All users</option>
            <option value={1}>Leanne Graham</option>
            <option value={2}>Ervin Howell</option>
            <option value={3}>Clementine Bauch</option>
            <option value={4}>Patricia Lebsack</option>
            <option value={5}>Chelsey Dietrich</option>
            <option value={6}>Mrs. Dennis Schulist</option>
            <option value={7}>Kurtis Weissnat</option>
            <option value={8}>Nicholas Runolfsdottir V</option>
            <option value={9}>Glenna Reichert</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userSelectId={userSelectId}
            selectedPostId={selectedPostId}
            isVisiblePost={isVisiblePost}
            showPost={showPost}
          />
        </div>

        {isVisiblePost && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
