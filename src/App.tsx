import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [showLoaderUsers, setShowLoaderUsers] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('All');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const loadUsersFromServer = async () => {
    setShowLoaderUsers(true);

    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
    } finally {
      setShowLoaderUsers(false);
    }
  };

  useEffect(() => {
    loadUsersFromServer();
  },
  []);

  const selectUserHandler = (userId: string) => {
    setCurrentUserId(userId);
  };

  return (
    <div className="App">
      {showLoaderUsers ? (
        <Loader />
      ) : (
        <header className="App__header">
          <label>
            Select a user: &nbsp;

            <select
              className="App__user-selector"
              defaultValue="All"
              onChange={e => selectUserHandler(e.target.value)}
            >
              <option value="DEFAULT" disabled>Choose...</option>
              <option value="All">All users</option>
              {users.map((user : UserType) => (
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
      )}

      <main className="App__main">
        {currentUserId && (
          <div className="App__sidebar">
            <PostsList
              currentUserId={currentUserId}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          </div>
        )}

        <div
          className={classNames(
            'App__content',
            { 'App__content--empty': !selectedPostId },
          )}
        >
          { selectedPostId && (
            <PostDetails
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
