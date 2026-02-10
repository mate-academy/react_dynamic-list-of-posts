import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';

export const App = () => {
  const [isLoading, setIsloadig] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  /*отримаємо юсерів з серверу */
  useEffect(() => {
    setIsloadig(true);
    client.get<User[]>('/users').then(data => {
      setUsers(data);
      setIsloadig(false);
    });
  }, []);

  // закриваємо сайдбар і очищаємо пост при зміні користувача
  useEffect(() => {
    setCurrentPost(null);
    setIsCommentOpen(false);
  }, [currentUser]);

  // обробник вибору юзера
  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
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
                  chosenUser={currentUser}
                  setCurrentUser={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                <p data-cy="NoSelectedUser">No user selected</p>

                {isLoading && <Loader />}

                {postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {postsError}
                  </div>
                )}

                {currentUser !== null && (
                  <PostsList
                    currentUser={currentUser}
                    isCommentOpen={isCommentOpen}
                    setIsCommentOpen={setIsCommentOpen}
                    setCurrentPost={setCurrentPost}
                    currentPost={currentPost}
                    onError={setPostsError}
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
              { 'Sidebar--open': isCommentOpen },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails currentPost={currentPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
