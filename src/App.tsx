import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { User } from './react-app-env';
import { Loader } from './components/Loader';
import { getAllUsers } from './api/api';

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then(response => setAllUsers(response));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={currentUser}
            onChange={(event) => {
              setCurrentUser(event.target.value);
              setIsLoading(true);
            }}
          >
            <option value="0" disabled>All users</option>
            {allUsers.map(user => (
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
          {isLoading && <Loader />}
          <PostsList
            userSelectedId={currentUser}
            selectPostId={setSelectedPostId}
            postId={selectedPostId}
            setIsLoading={setIsLoading}
          />
        </div>

        <div className="App__content">
          {currentUser !== '0' ? (
            <PostDetails
              postId={selectedPostId}
              setIsLoading={setIsLoading}
            />
          ) : (<p>Choose user!</p>)}
        </div>
      </main>
    </div>
  );
};

export default App;
