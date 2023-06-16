import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Notification } from './components/Notification';

import { getUsers } from './api/users';

import { User } from './types/User';
import { getUserPosts } from './api/posts';
import { Post } from './types/Post';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userIsSelected, setUserIsSelected] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [errorType, setErrorType] = useState(ErrorType.none);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const handleLoadPosts = async (userId: number) => {
    try {
      setSidebarIsOpen(false);
      setSelectedPost(null);
      setErrorType(ErrorType.none);
      setUserPosts([]);
      setUserIsSelected(true);
      setIsLoading(true);

      const postsFromServer = await getUserPosts(userId);

      setUserPosts(postsFromServer);

      if (!postsFromServer.length) {
        setErrorType(ErrorType.noPosts);
      }
    } catch {
      setErrorType(ErrorType.onPostsLoad);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSidebar = (post: Post) => {
    if (post === selectedPost) {
      setSidebarIsOpen(false);
      setSelectedPost(null);

      return;
    }

    setSidebarIsOpen(true);
    setSelectedPost(post);
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
                  onLoadPosts={handleLoadPosts}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userIsSelected && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && <Loader />}

                {errorType !== ErrorType.none && !sidebarIsOpen && (
                  <Notification errorType={errorType} />
                )}

                {!!userPosts.length && (
                  <PostsList
                    posts={userPosts}
                    selectedPost={selectedPost}
                    onOpenSidebar={handleOpenSidebar}
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
              { 'Sidebar--open': sidebarIsOpen },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  errorType={errorType}
                  setErrorType={setErrorType}
                  selectedPost={selectedPost}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
