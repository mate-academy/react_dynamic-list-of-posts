import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { User } from './react-app-env';
import { request } from './api/api';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const getUsersFromServer = async () => {
      const result = await request('Users');

      setUserList(result);
    };

    getUsersFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setCurrentUser(Number(event.target.value));
            }}
          >
            <option value="0">All users</option>
            {userList.map(singleUser => (
              <option value={singleUser.id}>{singleUser.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={currentUser}
            selectPostId={setSelectedPostId}
            post={selectedPostId}
          />
        </div>

        {selectedPostId && (
          <div className="App__content">
            <PostDetails post={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
