import './App.scss';
import './styles/general.scss';
import React, { useState, useEffect } from 'react';
import { getUserPosts, getPostDetails } from './api/posts';
import { getUsers } from './api/api';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post, User } from './react-app-env';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [currentUserId, setCurrentUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);

  const currentPost = (postId: number) => {
    setSelectedPostId(postId);
  };

  useEffect(() => {
    getUserPosts(currentUserId)
      .then(response => setPosts(response));
  }, []);

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
  }, []);

  useEffect(() => {
    getUserPosts(currentUserId)
      .then(response => setPosts(response));
  }, [currentUserId]);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => setSelectedPost(response));
  }, [selectedPostId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            onChange={(event) => {
              setCurrentUserId(event.target.value);
            }}
            className="App__user-selector"
          >
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
            currentPost={currentPost}
            selectedPostId={selectedPostId}
          />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails
              selectedPost={selectedPost}
              selectedPostId={selectedPostId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
