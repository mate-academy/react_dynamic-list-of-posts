import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';

const App: React.FC = () => {
  const [users, setUsers] = useState([] as User[]);
  const [selectedUser, setSelectUser] = useState(0);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+event.target.value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select className="App__user-selector" onChange={handleChange}>
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={selectedUser}
            selectedPostId={postId}
            selectPost={setPostId}
          />
        </div>

        {postId !== 0 && (
          <div className="App__content">
            <PostDetails
              selectedPostId={postId}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
