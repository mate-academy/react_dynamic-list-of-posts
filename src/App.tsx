import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUsers } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);

  const loadPosts = async () => {
    const loadedPosts = await getPosts(selectedUserId);

    setPosts(loadedPosts);
  };

  const loadUsers = async () => {
    const loadedUsers = await getUsers();

    setUsers(loadedUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option value="">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{`${user.name} ${user.username}`}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            setSelectedPostId={setSelectedPostId}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
