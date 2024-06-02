import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { User } from './types/User';
import { getPosts } from './api/posts';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [openedPost, setOpenedPost] = useState<Post>();
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [postsLoaded, setIsPostsLoaded] = useState(false);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsUsersLoaded(true);
    getUsers()
      .then(result => {
        setUsers(result);
      })
      .catch(() => {
        setError('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      setIsPostsLoaded(false);
      setOpenedPost(undefined);
      setIsFormOpened(false);
      getPosts(selectedUser.id)
        .then(result => {
          setPosts(result);
          setIsPostsLoaded(true);
        })
        .catch(() => {
          setError('Something went wrong while loading posts!');
        })
        .finally(() => setIsLoading(false));
    } else {
      setPosts([]);
      setIsPostsLoaded(false);
    }
  }, [selectedUser]);

  const handleOpenPost = (post: Post) => {
    setOpenedPost(post);
    setIsFormOpened(true);
  };

  const handleClosePost = () => {
    setOpenedPost(undefined);
    setIsFormOpened(false);
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isUsersLoaded && (
                  <UserSelector
                    userSelected={selectedUser}
                    users={users}
                    selectedUser={user => setSelectedUser(user)}
                  />
                )}
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && isLoading && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {postsLoaded && selectedUser && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {postsLoaded && posts.length > 0 && (
                  <PostsList
                    formStatus={isFormOpened}
                    openedPost={openedPost}
                    posts={posts}
                    onOpenPost={handleOpenPost}
                    onClosePost={handleClosePost}
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
              { 'Sidebar--open': isFormOpened },
            )}
          >
            {openedPost && isFormOpened && (
              <div className="tile is-child box is-success ">
                <PostDetails post={openedPost} selectedUser={selectedUser} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
