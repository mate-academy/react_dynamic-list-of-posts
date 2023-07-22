import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts, getUsers } from './api/users';
import { Post } from './types/Post';
import { User } from './types/User';
import { ErrorMessage } from './types/Error';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoaling, setIsLoaling] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [errorType, setErrorType] = useState<ErrorMessage>(ErrorMessage.None);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const handleLoadPosts = async (userId: number) => {
    setIsSidebarOpen(false);
    setSelectedPost(null);
    setUserPosts([]);
    setSelectedUserId(userId);
    setIsLoaling(true);
    try {
      const postFromServer = await getUserPosts(userId);

      setErrorType(ErrorMessage.None);

      setUserPosts(postFromServer);

      if (!postFromServer.length) {
        setErrorType(ErrorMessage.UserPosts);
      }
    } catch {
      setErrorType(ErrorMessage.UserPosts);
    } finally {
      setIsLoaling(false);
    }
  };

  const handleOpenSidebar = (post: Post) => {
    if (post === selectedPost) {
      setSelectedPost(null);
      setIsSidebarOpen(false);

      return;
    }

    setIsSidebarOpen(true);
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
                  selectedUserId={selectedUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoaling && (<Loader />)}

                {(!isLoaling && userPosts.length === 0 && selectedUserId
                && errorType) && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {(!isLoaling && !userPosts.length
                && !errorType && !handleLoadPosts)
                && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorType}
                  </div>
                )}

                {(!!userPosts.length && !isLoaling) && (
                  <PostsList
                    userPosts={userPosts}
                    onOpenSidebar={handleOpenSidebar}
                    selectedPost={selectedPost}
                  />
                )}

              </div>
            </div>
          </div>
          {isSidebarOpen && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                {selectedPost && (
                  <PostDetails
                    setErrorType={setErrorType}
                    selectedPost={selectedPost}
                    errorType={errorType}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
