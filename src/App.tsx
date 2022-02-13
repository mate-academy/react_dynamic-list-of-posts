/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

type Props = {};

const App: React.FC<Props> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);

  const loadUsers = async () => {
    const usersFromServer = await getUsers();

    setUsers(usersFromServer);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const handleChoosePost = (id: number) => {
    setPostId(id);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelect}
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
            userId={userId}
            onChoose={handleChoosePost}
          />
        </div>

        <div className="App__content">
          {postId !== 0 && (
            <PostDetails postId={postId} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
