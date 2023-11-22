import React, { useContext, useRef, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import cn from 'classnames';
import { loadComments, loadPosts } from './api/Api';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Comment } from './types/Comment';
import { Context } from './components/Context/Context';

export const App: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isShownSideBar, setIsShownSideBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    posts,
    isLoading,
    setPosts,
    setIsLoading,
  } = useContext(Context);

  const isSelectedUser = useRef(true);

  const getPosts = (id: number) => {
    setIsLoading(true);
    setPosts([]);
    setErrorMessage('');
    loadPosts(id)
      .then((data) => {
        if (data.length === 0) {
          setErrorMessage('No posts yet');
        }

        setPosts(data);
      })
      .catch((error) => {
        setErrorMessage('Something went wrong!');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getComments = (id: number) => {
    setErrorMessage('');
    setComments([]);
    setIsLoading(true);
    loadComments(id)
      .then((data) => {
        if (data.length === 0) {
          setErrorMessage('No comments yet');
        } else {
          setComments(data);
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  isSelectedUser={isSelectedUser}
                  getPosts={getPosts}
                  setIsShownSideBar={setIsShownSideBar}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {isSelectedUser.current && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && !posts.length && <Loader />}

                {errorMessage.includes('went wrong') && !posts.length && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {errorMessage.includes('No posts') && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    {errorMessage}
                  </div>
                )}

                {posts.length > 0 && (
                  <PostsList
                    setIsShownSideBar={setIsShownSideBar}
                    getComments={getComments}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': isShownSideBar },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails
                comments={comments}
                errorMessage={errorMessage}
                setComments={setComments}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
