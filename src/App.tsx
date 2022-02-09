import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts, getAllUser } from './api';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [arePostLoading, setArePostLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [areUserLoading, setAreUserLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const loadUserPosts = async (userId: string) => {
    try {
      setArePostLoading(true);
      const postsFromServer = await getUserPosts(Number(userId));

      setPosts(postsFromServer);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setArePostLoading(false);
    }
  };

  useEffect(() => {
    loadUserPosts(selectedUserId);
  }, [selectedUserId]);

  const loadUsers = async () => {
    try {
      setAreUserLoading(true);
      const usersFromServer = await getAllUser();

      setUsers(usersFromServer);
    } catch (error) {
      throw new Error(`${error}`);
    } finally {
      setAreUserLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        {areUserLoading
          ? (<Loader />)
          : (
            <label htmlFor="select-user">
              Select a user: &nbsp;
              <select
                value={selectedUserId}
                onChange={event => setSelectedUserId(event.target.value)}
                className="App__user-selector"
                id="select-user"
              >
                <option value="">All users</option>
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
          )}
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {arePostLoading ? <Loader /> : (
            <PostsList
              posts={posts}
              onSetSelectedPost={setSelectedPostId}
              selectedPostId={selectedPostId}
            />
          )}
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
