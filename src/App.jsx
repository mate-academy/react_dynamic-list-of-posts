import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers, getPosts } from './api/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    getUsers().then(arrUsers => setUsers(
      arrUsers.filter((user, i) => user.name && user.id === i + 1),
    ));

    getPosts().then(arrPosts => setPosts(arrPosts));
  }, []);

  const prepPosts = posts.filter(post => !userId || post.userId === userId);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={userId}
            onChange={(e) => {
              setUserId(+e.target.value);
            }}
          >

            <option value="">Select user</option>
            <option value="">Select all</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <span>{userId}</span>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={prepPosts}
            setPostId={setPostId}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postId && <PostDetails postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
