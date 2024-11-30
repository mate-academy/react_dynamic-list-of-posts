import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { getUsersFromServer } from './api/users';
import { Post } from './types/Post';
import { getPostsFromServer } from './api/posts';

export const App = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);

  useEffect(() => {
    getUsersFromServer()
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      setIsLoading(true);
      setPosts([]);
      setErrorMessage('');
      setNotificationMessage('');
      setActivePostId(null);

      getPostsFromServer(selectedUserId)
        .then(fetchPosts => {
          setPosts(fetchPosts);
          if (fetchPosts.length === 0) {
            setNotificationMessage('No posts yet');
          }
        })
        .catch(() => {
          setErrorMessage('Something went wrong!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedUserId]);

  const activePost = useMemo(() => {
    if (activePostId) {
      return posts.find(post => post.id === activePostId);
    }

    return null;
  }, [activePostId, posts]);
  
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropDownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isDropDownOpen={isDropDownOpen}
                  users={users}
                  setSelectedUserId={setSelectedUserId}
                  selectedUserId={selectedUserId}
                  setIsDropDownOpen={setIsDropDownOpen}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUserId && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {errorMessage && !isLoading && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {notificationMessage && !isLoading && !errorMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    {notificationMessage}
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    activePostId={activePostId}
                    setActivePostId={setActivePostId}
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
              { 'Sidebar--open': activePostId },
            )}
          >
            {activePost && (
              <div className="tile is-child box is-success ">
                <PostDetails activePost={activePost} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
