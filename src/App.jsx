import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { get30Users } from './api/posts';

const App = () => {
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(null);
  const [users, setUsers] = useState(null);

  const handleSelect = (changeEvent) => {
    setUserId(+changeEvent.target.value);
  };

  const getUsers = async() => {
    const response = await get30Users();

    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          {users && (
            <select
              className="App__user-selector"
              value={userId}
              onChange={handleSelect}
            >
              <option value="0">All users</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={userId}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {!!postId && <PostDetails postId={postId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
