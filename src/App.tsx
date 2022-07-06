import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { Post, User } from './react-app-env';
import { Loader } from './components/Loader';

const App: React.FC = () =>
{
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [loadedUsers, setLoadedUsers] = useState(false);
  const [loadedPosts, setLoadedPosts] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const importedUsers = await getUsers();

      setUsers(importedUsers);
      setLoadedUsers(true);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const importedPosts = await getPosts();

      setPosts(importedPosts);
      setLoadedPosts(true);
    };

    loadPosts();
  }, []);

  const postHandler = useCallback(
    (id: number) => {
      setSelectedPostId(id);
    }, [selectedPostId],
  );

  return (
    <div className="App">
      {loadedUsers
      && (
        <header className="App__header">
          <label>
            Select a user: &nbsp;
            <select
              className="App__user-selector"
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(+event.target.value)}
            >
              <option value="0">All users</option>
              {users.map((user) => {
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
      )}
      <main className="App__main">
        <div className="App__sidebar">
          {loadedPosts
            ? (
              <PostsList
                posts={posts}
                selectedPostId={selectedPostId}
                onSelectPost={postHandler}
              />
            )
            : (
              <Loader />
            )}
        </div>

        <div className="App__content">
          {selectedPostId && (
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
