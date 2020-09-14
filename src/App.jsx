import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { getAllPosts, getPostDetails } from './api/posts';
import { getUsers } from './api/users';

const App = () => {
  const [posts, updatePosts] = useState([]);
  const [users, updateUsers] = useState([]);
  const [userId, updateUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [details, setDetails] = useState({});

  useEffect(() => {
    getAllPosts(+userId).then(response => updatePosts(response));
  }, [userId]);

  useEffect(() => {
    getUsers().then(response => updateUsers(response.data.slice(0, 10)));
  }, []);

  useEffect(() => {
    getPostDetails(postId).then(response => setDetails(response.data));
  }, [postId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={event => updateUserId(event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            postId={postId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          <PostDetails details={details} postId={postId} />
        </div>
      </main>
    </div>
  );
};

export default App;
