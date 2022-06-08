import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import * as PostsApi from './api/posts';
import { getAllUsers } from './api/users';

type User = {
  id: number,
  name: string,
};

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const data = await PostsApi.getAllPosts();

      setPosts(data);
    };

    getPosts();
  }, []);

  useEffect(() => {
    setSelectedPostId(null);
  }, [selectedUser]);

  const UserSelect = useCallback(async (user) => {
    const data = user === 0
      ? await PostsApi.getAllPosts()
      : await PostsApi.getUserPosts(user);

    setSelectedUser(user);

    setPosts(data);
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => UserSelect(+event.target.value)}
          >
            <option value="0">All users</option>

            {users.map((user: User) => (
              <option key={user.id} value={user.id}>{user.name}</option>
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

        {selectedPostId && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
