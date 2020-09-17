import React, { useState, useEffect } from 'react';
import { getPostDetails, getUserPosts } from './api/posts';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(setPosts);
  }, [selectedUser]);

  const getUserId = (event) => {
    const { value } = event.target;

    setSelectedUser(+value);
  };

  const postClose = () => {
    setSelectedPostId(null);
    setSelectedPost(null);
  };

  const postSelection = (postId) => {
    setSelectedPostId(postId);

    getPostDetails(postId)
      .then(setSelectedPost);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={getUserId}>
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
            postClose={postClose}
            postSelection={postSelection}
          />
        </div>

        <div className="App__content">
          {selectedPost && (
            <PostDetails
              {...selectedPost}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
