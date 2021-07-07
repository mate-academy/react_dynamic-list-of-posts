import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPostDetails, getPosts } from './api/posts';
import users from './api/users.json';

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
            <option
              value="0"
              key="0"
            >
              All users
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
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
