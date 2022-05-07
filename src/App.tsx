import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { request, getPostDetails } from './api/api';
import { Posts } from './types/types';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [selectValue, setSelectValue] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  useEffect(() => {
    if (selectValue === '0') {
      request()
        .then(post => {
          setPosts(post);
        });
    } else {
      getPostDetails(`${selectValue}`)
        .then(post => {
          setPosts(post);
        });
    }
  }, [selectValue]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectValue}
            onChange={(event) => setSelectValue(event.target.value)}
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
            visiblePosts={posts}
            selectedPost={(postId) => {
              setSelectedPostId(postId);
            }}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails selectedPostId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
