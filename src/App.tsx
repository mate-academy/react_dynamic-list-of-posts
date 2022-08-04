import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { PostsContext } from './contexts/PostsContext';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadPosts = (userId?: number) => {
    getUserPosts(userId)
      .then(setPosts);
  };

  const loadUsers = () => {
    getUsers()
      .then(data => setUsers(data.slice(0, 8)));
  };

  useEffect(() => {
    Promise.all([loadPosts(), loadUsers()]);
  }, []);

  return (
    <PostsContext.Provider value={{
      selectedPostId,
      setSelectedPostId,
      posts,
      setPosts,
      comments,
      setComments,
    }}
    >
      <div className="App">
        <header className="App__header">
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              onChange={(event) => {
                loadPosts(Number(event.target.value));
              }}
            >
              <option value="0">All users</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </header>

        <main className="App__main">
          <div className="App__sidebar">
            <PostsList />
          </div>

          <div className="App__content">
            {Boolean(selectedPostId) && <PostDetails />}
          </div>
        </main>
      </div>
    </PostsContext.Provider>
  );
};

export default App;
