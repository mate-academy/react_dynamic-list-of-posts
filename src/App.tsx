import React, { useCallback, useEffect, useState } from 'react';
import { getUsers } from './api/users';
import { getPosts, getUserPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';

import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const fetchUsers = useCallback(async () => {
    setPostsLoading(true);
    setUsers(await getUsers());
  }, []);

  const fetchPosts = useCallback(async () => {
    setPosts(await getPosts());
    setPostsLoading(false);
  }, []);

  const fetchUserPosts = useCallback(async () => {
    setPostsLoading(true);
    setPosts(await getUserPosts(selectedUserId));
    setPostsLoading(false);
  }, [selectedUserId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId === 0) {
      fetchPosts();
    } else {
      fetchUserPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {postsLoading
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
          {selectedPostId === 0
            ? <p>Select post to see details</p>
            : <PostDetails selectedPostId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
