/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { CircularProgress } from '@mui/material';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './api/posts';
import { getUsers } from './api/user';
import { Post, User } from './react-app-env';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    getUserPosts(selectedUser)
      .then(postsFromServer => {
        setIsLoading(true);
        setPosts(postsFromServer);
      });
    // eslint-disable-next-line no-console
    console.log(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    getUsers().then(setUsers);
    // .catch(() => (setErrorPostsList(true)));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => setSelectedUser(+event.target.value)}

          >
            <option value={0}>All users</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading ? (
            <PostsList
              posts={posts}
              setSelectedPost={setSelectedPostId}
              selectedPostId={selectedPostId}
            />
          ) : (
            <CircularProgress />
          )}
        </div>

        <div className="App__content">
          {!!selectedPostId && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
