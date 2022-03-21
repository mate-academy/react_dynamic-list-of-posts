import React, { useCallback, useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { Post } from './types/Post';
import { User } from './types/User';
import { SelectedPostId } from './types/SelectedPostId';

import { getAllPosts, getUserPosts } from './api/posts';
import { getAllUsers } from './api/users';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<SelectedPostId>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const postsFromServer = await getAllPosts();

      setPosts(postsFromServer);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    const fetchingUsers = await getAllUsers();

    setUsers(fetchingUsers);
  }, []);

  const fetchUserPosts = useCallback(async (userId: number) => {
    const fetchingUserPosts = await getUserPosts(userId);

    setPosts(fetchingUserPosts);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPosts();
    fetchUsers();
  }, []);

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      fetchUserPosts(+event.target.value);
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-select">
          <p>Select a user:</p>

          <select
            id="user-select"
            className="App__user-selector"
            onChange={onUserChange}
          >
            <option value="">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading
            ? <Loader />
            : (
              <PostsList
                posts={posts}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
              />
            )}
        </div>

        <div className="App__content">
          {selectedPostId !== null && <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
