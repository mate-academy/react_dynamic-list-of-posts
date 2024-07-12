import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsers } from './services/user';
import { Post } from './types/Post';
import { getUserPosts } from './services/post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDetailsShown, setIsDetailsShown] = useState(false);
  const [postDetails, setPostDetails] = useState<Post | null>(null);

  const loadUsers = () => {
    getUsers()
      .then(setUsers)
      .catch(() => setErrorMessage('Something went wrong!'));
  };

  const loadUserPosts = (userId: number) => {
    setLoading(true);

    getUserPosts(userId)
      .then(setUserPosts)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));
  };

  useEffect(loadUsers, []);

  useEffect(() => {
    if (selectedUser) {
      loadUserPosts(selectedUser.id);
    }
  }, [selectedUser]);

  const selectUser = (userId: number) => {
    const foundUser = users.find(user => user.id === userId) || null;

    setSelectedUser(foundUser);
    setIsDetailsShown(false);
    setPostDetails(null);
  };

  const showPostDetails = (details: Post | null) => {
    setIsDetailsShown(true);
    setPostDetails(details);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelectedUser={selectUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {!loading && errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {!loading &&
                  selectedUser &&
                  !userPosts.length &&
                  !errorMessage && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {!loading && selectedUser && !!userPosts.length && (
                  <PostsList
                    userPosts={userPosts}
                    onShowDetails={showPostDetails}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
              'Sidebar--open': isDetailsShown && postDetails,
            })}
          >
            <div className="tile is-child box is-success ">
              {postDetails && <PostDetails postDetails={postDetails} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
