import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { getUsers } from './api/users';
import { getUserPosts } from './api/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const allPosts = await getUserPosts(selectedUserId);

        setError(false);
        setPosts(allPosts);
      } catch {
        setError(true);
      }
    })();
  }, [selectedUserId]);

  useEffect(() => {
    (async () => {
      try {
        const usersFromApi = await getUsers();

        setUsers(usersFromApi);
      } catch {
        setError(true);
      }
    })();
  }, []);

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
  };

  const selectPost = (postId: number) => {
    setSelectedPostId(postId);
  };

  return (
    error ? (
      <h2>Ups... something went wrong</h2>
    ) : (
      <div className="App">
        <header className="App__header">
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              value={selectedUserId}
              onChange={selectUser}
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
              selectedPostId={selectedPostId}
              selectPostId={selectPost}
            />
          </div>

          {!!selectedPostId && (
            <div className="App__content">
              <PostDetails
                selectedPostId={selectedPostId}
              />
            </div>
          )}
        </main>
      </div>
    )
  );
};

export default App;
