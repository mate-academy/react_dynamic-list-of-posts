import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { Loader } from './components/Loader';

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: {
    id: string;
    userId: string;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    createdAt: string;
    updatedAt: string;
  }
};

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [showLoaderUsers, setShowLoaderUsers] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');
  const [showPostDetails, setShowPostDetails] = useState(false);

  const loadData = async () => {
    setShowLoaderUsers(true);

    // eslint-disable-next-line no-console
    // console.log('selectedPostId =', selectedPostId);

    try {
      const usersFromServer = await getUsers();

      // // eslint-disable-next-line array-callback-return
      // usersFromServer.map((user: User) => {
      //   // eslint-disable-next-line no-console
      //   console.log(user.id);
      // });

      setUsers(usersFromServer);
      setShowLoaderUsers(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);

      setShowLoaderUsers(false);
    }
  };

  useEffect(() => {
    loadData();
  },
  []);

  const selectUserHandler = (userId: string) => {
    setCurrentUserId(userId);
    setShowPostDetails(false);
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
              defaultValue="DEFAULT"
              onChange={e => selectUserHandler(e.target.value)}
            >
              <option value="DEFAULT" disabled>Choose...</option>
              <option value="All">All users</option>
              {users.map((user : User) => (
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
              setShowPostDetails={setShowPostDetails}
            />
          </div>
        )}

        <div
          className={classNames(
            'App__content',
            { 'App__content--hidden': !showPostDetails },
          )}
        >
          { selectedPostId && (
            <PostDetails
              selectedPostId={selectedPostId}
            />
          )}
        </div>

      </main>
    </div>
  );
};

export default App;
