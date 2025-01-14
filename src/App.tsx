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
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getCommentsForPost, getPostsForUser, getUsers } from './api/helperApi';
import { ShowError } from './types/AppErrors';
import { IsLoading } from './types/Loading';

export const App = () => {
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [postSelected, setPostSelected] = useState<Post | null>(null);
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [commentsForPost, setCommentsForPost] = useState<Comment[]>([]);
  const [postsForUser, setPostsForUser] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<IsLoading>({
    postListLoading: false,
    PostDetailsLoading: false,
    usersLoading: false,
  });

  const [showError, setShowError] = useState<ShowError>({
    usersError: false,
    PostsLoadingError: false,
    PostDetailsError: false,
  });

  useEffect(() => {
    getUsers()
      .then(setUsersFromServer)
      .catch(() => setShowError(prev => ({ ...prev, usersError: true })));
  }, []);

  useEffect(() => {
    if (userSelected) {
      setIsLoading(prev => ({ ...prev, postListLoading: true }));
      getPostsForUser(userSelected.id)
        .then(posts => {
          setPostSelected(null);
          setPostsForUser(posts);
        })
        .catch(() =>
          setShowError(prev => ({ ...prev, PostsLoadingError: true })),
        )
        .finally(() =>
          setIsLoading(prev => ({ ...prev, postListLoading: false })),
        );
    }
  }, [userSelected]);

  useEffect(() => {
    if (postSelected) {
      setIsLoading(prev => ({ ...prev, PostDetailsLoading: true }));
      getCommentsForPost(postSelected.id)
        .then(setCommentsForPost)
        .catch(() =>
          setShowError(prev => ({ ...prev, PostDetailsError: true })),
        )
        .finally(() =>
          setIsLoading(prev => ({ ...prev, PostDetailsLoading: false })),
        );
    }
  }, [postSelected]);

  const renderError = (errorKey: keyof ShowError) =>
    showError[errorKey] && (
      <div className="notification is-danger" data-cy={`${errorKey}`}>
        Something went wrong!
      </div>
    );

  const renderLoader = (loadingKey: keyof IsLoading) =>
    isLoading[loadingKey] && <Loader />;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setUserSelected={setUserSelected}
                  userSelected={userSelected}
                  usersFromServer={usersFromServer}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {renderLoader('postListLoading') ||
                  renderError('PostsLoadingError') ||
                  (userSelected && (
                    <PostsList
                      postsForUser={postsForUser}
                      user={userSelected}
                      setPostSelected={setPostSelected}
                    />
                  ))}
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
              { 'Sidebar--open': postSelected },
            )}
          >
            <div className="tile is-child box is-success">
              {postSelected && (
                <PostDetails
                  postSelected={postSelected}
                  PostDetailsLoading={isLoading.PostDetailsLoading}
                  commentsForPost={commentsForPost}
                  setCommentsForPost={setCommentsForPost}
                  showError={showError.PostDetailsError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
