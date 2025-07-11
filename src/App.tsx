import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import * as service from './services/servises';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleError = (message: string) => {
    setErrorMsg(message);

    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);

    service
      .getUsers()
      .then(setUsers)
      .catch(error => {
        handleError('Something went wrong!');
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onUserSelect={user => {
                    setSelectedUser(user);
                    setSelectedPost(null);
                  }}
                  selectedUser={selectedUser}
                />
              </div>
              <div className="block" data-cy="MainContent">
                {!selectedUser ? (
                  <p data-cy="NoSelectedUser">No user selected</p>
                ) : (
                  <>
                    {errorMsg && (
                      <div
                        className="notification is-danger"
                        data-cy="PostsLoadingError"
                      >
                        {errorMsg}
                      </div>
                    )}

                    {selectedUser && (
                      <PostsList
                        user={selectedUser.id}
                        setLoading={setLoading}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails
                  post={selectedPost}
                  setLoading={setLoading}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
