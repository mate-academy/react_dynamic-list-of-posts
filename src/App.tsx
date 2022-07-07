import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Post, User } from './react-app-env';
import { getUserPosts, getUsers } from './api/posts';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const loadUsers = useCallback(
    async () => {
      const loadedUsers = await getUsers();

      setUsers(loadedUsers);
    },
    [],
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const firstTenUsers = users.filter(user => user.id <= 10 && user.id >= 1);

  const loadPosts = useCallback(
    async () => {
      const loadedPosts = await getUserPosts(selectedUserId);

      setPostsLoaded(true);

      setPosts(loadedPosts);
    },
    [],
  );

  useEffect(() => {
    loadPosts();
  }, [selectedUserId]);

  const selectPostHandler = useCallback(
    (postId: number) => {
      setSelectedPostId(postId);
    },
    [selectedPostId],
  );

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(+event.target.value)}
          >
            <option value="0">All users</option>
            {firstTenUsers.map((user) => {
              return (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {postsLoaded
            ? (
              <PostsList
                posts={posts}
                selectedPostId={selectedPostId}
                onSelectPost={selectPostHandler}
              />
            )
            : (
              <Loader />
            )}
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
