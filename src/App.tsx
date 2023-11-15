import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './utils/helpers';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { LoadingItems } from './types/LoadingItems';
import { HasErrorItem } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] >([]);
  const [isLoading, setIsLoading] = useState<LoadingItems>('');
  const [hasError, setHasError] = useState<HasErrorItem>('');

  useEffect(() => {
    const fetch = async () => {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    };

    fetch();
  }, []);

  useEffect(() => {
    return () => {
      setHasError('');
    };
  }, [selectedUser, selectedPost]);

  let elementToRender = <Loader />;

  switch (true) {
    case isLoading === 'Posts':
      elementToRender = <Loader />;
      break;
    case hasError === 'Posts':
      elementToRender = (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      );
      break;
    case selectedUser === null:
      elementToRender = (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      );
      break;
    case !!posts?.length:
      elementToRender = (
        <PostsList
          posts={posts}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          setComments={setComments}
          setIsLoading={setIsLoading}
          setHasError={setHasError}
        />
      );
      break;
    case !posts?.length:
      elementToRender = (
        <div
          className="notification is-warning"
          data-cy="NoPostsYet"
        >
          No posts yet
        </div>
      );
      break;
    default:
      break;
  }

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
                  setPosts={setPosts}
                  setIsLoading={setIsLoading}
                  setHasError={setHasError}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {elementToRender}
              </div>
            </div>
          </div>

          {selectedPost && (
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
                <PostDetails
                  selectedPost={selectedPost}
                  comments={comments}
                  setComments={setComments}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  hasError={hasError}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};
