import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers, getUserPosts } from './api/serverData';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState(-1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      if (usersFromServer) {
        setUsers(usersFromServer);
      }
    } catch {
      setIsError(true);
      Notiflix.Notify.failure('Can`t get users. Please try again');
    }
  };

  const loadUserPosts = async (userId: number) => {
    try {
      setIsLoading(true);
      setIsWarning(false);
      setIsError(false);
      const userPosts = await getUserPosts(userId);

      if (userPosts.length) {
        setPosts(userPosts);
      } else {
        setIsWarning(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const setActiveUserOnClick = (userId: number) => {
    if (activeUserId !== userId) {
      setPosts([]);
      setIsOpen(false);
    }

    setActiveUserId(userId);
    loadUserPosts(userId);
  };

  const setActivePostOnClick = (post: Post) => {
    setActivePost(post);
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
                  onChooseUser={setActiveUserOnClick}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {activeUserId < 0 && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isWarning && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    onPostDetails={setActivePostOnClick}
                    onShowPostDetails={setIsOpen}
                  />
                )}
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': activePost },
              )}
            >
              { activePost && (
                <div className="tile is-child box is-success ">
                  <PostDetails post={activePost} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
