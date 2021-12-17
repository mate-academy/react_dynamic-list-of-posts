import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { Post, User } from './types/types';

export const App: React.FC = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [selectedPostId, setPostId] = useState(0);
  const [users, setUsers] = useState([] as User[]);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    getUserPosts(userId)
      .then(result => setPosts(result));
  }, [userId]);

  useEffect(() => {
    getUsers()
      .then(result => setUsers(result));
  }, []);

  const selectPost = (postId: number) => {
    if (postId === selectedPostId) {
      setPostId(0);
    } else {
      setPostId(postId);
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setUserId(+event.target.value);
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
            selectPost={selectPost}
            selectedId={selectedPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails postId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};
