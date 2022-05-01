import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [userId, setUserId] = useState<number | undefined>();
  const [users, setUsers] = useState<Users[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadPosts = async () => {
    const postsList = await getUserPosts(userId);

    setPosts(postsList);
  };

  const loadUsers = async () => {
    const usersList = await getUsers();

    setUsers(usersList);
  };

  useEffect(() => {
    loadPosts();
  }, [userId]);

  useEffect(() => {
    loadUsers();
  }, []);

  const selectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const selectPostId = (postId: number) => {
    setSelectedPostId(postId === selectedPostId ? 0 : postId);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectedUser}
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
            postId={selectedPostId}
            selectPostId={selectPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0
            && (
              <PostDetails
                postId={selectedPostId}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
