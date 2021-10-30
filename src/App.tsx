import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { User } from './react-app-env';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [userList, setUserList] = useState<User[]>([]);

  getUsers().then(users => setUserList(users));
  const setUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.currentTarget.value);
  };

  useEffect(() => {

  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        {/* eslint-disable-next-line */}
        <label>
          Select a user: &nbsp;
          <select className="App__user-selector" value={selectedUserId} onChange={setUser}>
            <option value="0">All users</option>
            {userList.map((user) => (
              <option
                key={user.id}
                value={`${user.id}`}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList userId={+selectedUserId} setSelectedPostId={setSelectedPostId} />
        </div>

        <div className="App__content">
          {selectedPostId ? <PostDetails postId={+selectedPostId} /> : ''}
        </div>
      </main>
    </div>
  );
};

export default App;
