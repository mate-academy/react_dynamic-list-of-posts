import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { Errors } from './types/Errors';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';

export const App = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [currentError, setCurrentError] = useState<Errors | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [newCommentCreating, setNewCommentCreating] = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then(setUsersList)
      .catch(() => setCurrentError(Errors.UsersLoading));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setCurrentError(null);
    setUserPosts(null);
    setIsPostsLoading(true);

    getPosts(selectedUser.id)
      .then(response => {
        if (Array.isArray(response)) {
          setUserPosts(response);
          if (response.length === 0) {
            setCurrentError(Errors.NoPosts);
          }
        } else {
          setCurrentError(Errors.PostsLoading);
        }
      })
      .catch(() => setCurrentError(Errors.PostsLoading))
      .finally(() => {
        setIsPostsLoading(false);
      });
  }, [selectedUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={usersList}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && !currentError && <Loader />}

                {currentError === Errors.PostsLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentError === Errors.NoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts && userPosts.length > 0 && (
                  <PostsList
                    posts={userPosts}
                    openedPost={openedPost}
                    setOpenedPost={setOpenedPost}
                    setNewCommentCreating={setNewCommentCreating}
                  />
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
              { 'Sidebar--open': openedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {openedPost && (
                <PostDetails
                  post={openedPost}
                  newCommentCreating={newCommentCreating}
                  setNewCommentCreating={setNewCommentCreating}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
