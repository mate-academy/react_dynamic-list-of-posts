import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { Post } from './types/posts';
import { User } from './types/user';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadPosts = (userId?: number) => {
    getUserPosts(userId)
      .then(postsFromSserver => {
        setPosts(postsFromSserver);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    getUsers()
      .then(userssFromSserver => {
        setUsers(userssFromSserver.slice(0, 10));
      });
  }, []);

  const changeHendler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    loadPosts(Number(event.target.value));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={changeHendler}>
            <option defaultValue="0">All users</option>
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
            selectedPost={selectedPostId}
            selectPost={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {!!selectedPostId
          && <PostDetails selectedPost={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};
