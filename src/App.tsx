import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import * as userService from './api/users';
import * as postService from './api/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    userService
      .getUsers()
      .then(setUsers)
      .catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    setIsPostsLoading(true);
    postService
      .getUserPosts(selectedUser?.id || 0)
      .then(setUserPosts)
      .catch(() => setHasError(true))
      .finally(() => setIsPostsLoading(false));
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
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              {isPostsLoading ? (
                <Loader />
              ) : (
                <div className="block" data-cy="MainContent">
                  {!selectedUser && (
                    <p data-cy="NoSelectedUser">No user selected</p>
                  )}

                  {hasError && !isPostsLoading && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                  {selectedUser &&
                    !hasError &&
                    (!userPosts.length ? (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    ) : (
                      <PostsList
                        userPosts={userPosts}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': selectedPost !== null },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success ">
                <PostDetails selectedPost={selectedPost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
