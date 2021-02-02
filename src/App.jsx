import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts } from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedPost, setSelectedPost] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [areCommentsHidden, setAreCommentsHidden] = useState(true);

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setPosts(allPosts);
    });
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setSelectedUser(event.target.value);
              setIsOpen(false);
            }}
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
            selectedUser={selectedUser}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setAreCommentsHidden={setAreCommentsHidden}
          />
        </div>

        <div className="App__content">
          {isOpen ? (
            <PostDetails
              selectedPost={selectedPost}
              areCommentsHidden={areCommentsHidden}
              setAreCommentsHidden={setAreCommentsHidden}
            />
          ) : `here will be selected post`}
        </div>
      </main>
    </div>
  );
};

export default App;
