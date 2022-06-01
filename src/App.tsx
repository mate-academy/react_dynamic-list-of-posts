import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const loadUsers = async () => {
    setIsPostLoading(true);
    const userFromServer = await getUsers();

    setUsers(userFromServer);
    setIsPostLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const clearPost = () => {
    setPostId(0);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    clearPost();
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelect">
          Select a user: &nbsp;

          <select
            id="userSelect"
            className="App__user-selector"
            onChange={handleChange}
            value={userId}
          >
            <option value="0">All users</option>
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
          {isPostLoading
            ? <Loader />
            : (
              <PostsList
                userId={userId}
                selectedPostId={postId}
                setPostId={setPostId}
              />
            )}
        </div>
        <div className="App__content">
          {postId !== 0
            ? (
              <PostDetails
                postId={postId}
              />
            )
            : <div className="PostsList__item">Choose a User</div>}
        </div>
      </main>
    </div>
  );
};

export default App;
