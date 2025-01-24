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
import { getUsers } from './api/users';
import { getUserPosts } from './api/post';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState<boolean>(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [activePostId, setActivePostId] = useState<null | number>(null);
  const hasNoError = errorMessage === '';

  // #region getUsers
  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(error => {
        setErrorMessage('Something went wrong!');
        throw error;
      });
  }, []);
  // #endregion

  // #region getUserPosts
  useEffect(() => {
    setIsLoadingUserPosts(true);
    if (!selectedUser) {
      setIsLoadingUserPosts(false);

      return;
    }

    getUserPosts(selectedUser.id)
      .then(response => {
        setPosts(response);
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoadingUserPosts(false);
      });
  }, [selectedUser]);
  // #endregion

  useEffect(() => {
    setActivePostId(null);
    setIsOpenSidebar(false);
  }, [selectedUser]);

  const handlePostClick = (postId: number) => {
    if (!activePostId) {
      setActivePostId(postId);
      setIsOpenSidebar(true);
    }

    if (activePostId === postId) {
      setActivePostId(null);
      setIsOpenSidebar(false);
    }

    if (activePostId !== postId) {
      setActivePostId(postId);
    }
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
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                  //onSelect={onSelect}
                  //onSelect: (user: User) => void
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {!hasNoError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {selectedUser && (
                  <>
                    {isLoadingUserPosts ? (
                      <Loader />
                    ) : posts.length === 0 && hasNoError && selectedUser ? (
                      <div
                        className="notification is-warning"
                        data-cy="NoPostsYet"
                      >
                        No posts yet
                      </div>
                    ) : (
                      <PostsList
                        activePostId={activePostId}
                        posts={posts}
                        onPostClick={handlePostClick}
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
              { 'Sidebar--open': isOpenSidebar },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                post={posts.find(post => post.id === activePostId)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
