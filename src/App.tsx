import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [userId, addUserId] = useState(0);
  const [postId, addPostId] = useState<number | null>(null);
  const [users, addUsers] = useState<User[]>([]);

  const changeUser = (id: string) => {
    addUserId(+id);
  };

  useEffect(() => {
    getUsers()
      .then(promise => addUsers(promise));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="userSelector">
          Select a user: &nbsp;
          <select
            onChange={(event) => changeUser(event.target.value)}
            value={userId}
            className="App__user-selector"
            id="userSelector"
          >
            <option value="0">All users</option>
            {
              users?.map(user => (
                <option value={`${user.id}`} key={user.id}>{user.name}</option>
              ))
            }
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            getPostId={(value) => addPostId(value)}
          />
        </div>

        <div className="App__content">
          {postId && <PostDetails postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
