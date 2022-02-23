import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadUsers = async () => {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer);
  };

  const loadPosts = async () => {
    const postsFromServer = await getUserPosts(selectedUserId);

    setPosts(postsFromServer);
  };

  useEffect(() => {
    loadUsers();
    loadPosts();
  }, [selectedUserId]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select-user">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="select-user"
            onChange={handleUserSelect}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{`#${user.id}: ${user.name}`}</option>
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
          {selectedPostId ? (
            <PostDetails selectedPostId={selectedPostId} />
          ) : (
            <h3 className="sticky">Open post to see details</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
