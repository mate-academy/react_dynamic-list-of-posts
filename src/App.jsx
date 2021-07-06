import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getPosts } from './api/posts';

export const App = () => {
  const [posts, setPosts] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [postDetails, setPostDetails] = useState('');

  useEffect(() => {
    getPosts()
      .then(result => setPosts(result));
  }, []);

  const selectPostId = (postId) => {
    getPostDetails(postId)
      .then(result => setPostDetails(result));
  };

  const closeDetails = () => {
    setPostDetails('');
  };

  let visiblePosts = [...posts];

  if (selectedUser !== 0) {
    visiblePosts = posts.filter(post => post.userId === selectedUser);
  }

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={e => setSelectedUser(+e.target.value)}
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
          {(posts.length !== 0) && (
            <PostsList
              posts={visiblePosts}
              selectPostId={selectPostId}
              postId={postDetails.id}
              onClose={closeDetails}
            />
          )}
        </div>

        {(postDetails.length !== 0) && (
          <div className="App__content">
            <PostDetails
              postId={postDetails.id}
              body={postDetails.body}
            />
          </div>
        )}
      </main>
    </div>
  );
};
