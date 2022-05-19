import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsersFromServer } from './api/api';
import { Post, User } from './types';
import { getPostByUserId } from './api/posts';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const getPosts = (userId?: number) => (
    getPostByUserId(userId)
      .then(data => setPosts(data))
  );

  const getUsers = () => (
    getUsersFromServer().then(data => (
      setUsers(data.slice(0, 8))
    ))
  );

  const selectPost = useCallback((postId: number) => {
    setSelectedPostId(postId);
  }, [setSelectedPostId]);

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            defaultValue="0"
            onChange={e => {
              getPosts(+e.target.value);
            }}
          >
            <option value="0">All users</option>
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
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            onSelect={selectPost}
            selectedPost={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId
            ? (
              <PostDetails selectedPostId={selectedPostId} />
            )
            : (
              <h1>Select Post</h1>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
