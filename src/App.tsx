import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUserPosts, getUsers } from './utils/fetchClient';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(newError => {
        throw newError;
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);

      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setError('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  setSelectedPost={setSelectedPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {!loading &&
                  !error &&
                  selectedUser &&
                  (userPosts.length > 0 ? (
                    <PostsList
                      userPosts={userPosts}
                      setSelectedPost={setSelectedPost}
                      setShowForm={setShowForm}
                      selectedPost={selectedPost}
                    />
                  ) : (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  ))}

                {loading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
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
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails
                  selectedPost={selectedPost}
                  showForm={showForm}
                  setShowForm={setShowForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
