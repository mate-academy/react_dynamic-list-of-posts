import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { getUserPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    getUserPosts()
      .then((userPosts) => {
        setPosts(userPosts);
        setIsLoading(true);
      });
  }, []);

  const [selectedPostId, setSelectedPostId] = useState(0);

  const handleSelectUser = (value) => {
    setIsLoading(false);
    getUserPosts(value === '0'
      ? '' : value)
      .then((userPosts) => {
        setPosts(userPosts);
        setSelectedPostId(0);
        setIsLoading(true);
      });
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => handleSelectUser(event.target.value)}
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
        {isLoading ? (
          <div className="App__sidebar">
            <PostsList
              postsList={posts}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          </div>
        )
          : (
            <Loader />
          )}

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails
              postId={selectedPostId}
            />
          </div>
        )
        }
      </main>
    </div>
  );
};

export default App;
