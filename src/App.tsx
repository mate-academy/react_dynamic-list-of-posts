import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts, getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [userSelector, setUserSelector] = useState(0);
  const [selectedPostId, setselectedPostId] = useState(0);

  useEffect(() => {
    if (userSelector === 0) {
      getAllPosts()
        .then(responce => {
          setPosts(responce);
        });
    } else {
      getUserPosts(userSelector)
        .then(responce => {
          setPosts(responce);
        });
    }
  }, [userSelector]);

  const handleChange = (event: any) => {
    setUserSelector(event.target.value);
  };

  const selectPostId = (id: number) => {
    setselectedPostId(id);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select className="App__user-selector" id="user-selector" value={userSelector} onChange={handleChange}>
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
          <PostsList posts={posts} selectPostId={selectPostId} selectedPostId={selectedPostId} />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
