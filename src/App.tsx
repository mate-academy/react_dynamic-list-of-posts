import React, { useEffect, useState, useRef } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { ApiRouters } from './utils/ApiRouters';
import { ErrorType } from './utils/ErrorType';

import {
  getUsers, getPosts, getComments, post, removeComment,
} from './api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState<ErrorType>(ErrorType.INITIAL);
  const [isSelectClicked, setIsSelectClicked] = useState<boolean>(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [currentPostTitle, setCurrentPostTitle] = useState<string | null>('');
  const [currentPostBody, setCurrentPostBody] = useState<string | null>('');
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getUsers(ApiRouters.USERS)
      .then(usersFromServer => setUsers(usersFromServer))
      .catch(() => setError(ErrorType.GET));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current
        && !selectRef.current.contains(event.target as Node)) {
        setIsSelectClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectRef]);

  const handleSelectButtonClick = () => {
    setIsSelectClicked(!isSelectClicked);
  };

  const handleOnUserClick = (name: string, id: number) => {
    handleSelectButtonClick();
    setCurrentUserId(id);
    setCurrentUserName(name);
    setPosts(null);
    setError(ErrorType.INITIAL);

    getPosts(ApiRouters.POSTS, id)
      .then(postsFromServer => setPosts(postsFromServer))
      .catch(() => setError(ErrorType.GET));
  };

  const handleOnWriteACommentClick = () => {
    setShowNewCommentForm(true);
  };

  const handleCommentDelete = (id?: number) => {
    if (!id) {
      return;
    }

    removeComment(ApiRouters.COMMENTS, id)
      .then(() => {
        if (comments && error !== ErrorType.DELETE) {
          setComments(comments?.filter(comment => comment.id !== id));
        }
      })
      .catch(() => setError(ErrorType.DELETE));
  };

  const handleOnPostClick = (id: number, title: string, body: string) => {
    setCurrentPostTitle(title);
    setCurrentPostBody(body);
    setCurrentPostId(id);
    setShowNewCommentForm(false);
    setComments(null);
    setError(ErrorType.INITIAL);

    if (currentPostId === id) {
      setCurrentPostId(null);
    }

    getComments(ApiRouters.COMMENTS, id)
      .then((commentsFromServer) => {
        setComments(commentsFromServer);
      })
      .catch(() => setError(ErrorType.GET));
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
                  currentUserName={currentUserName}
                  currentUserId={currentUserId}
                  selectRef={selectRef}
                  handleSelectButtonClick={handleSelectButtonClick}
                  isSelectClicked={isSelectClicked}
                  handleOnUserClick={handleOnUserClick}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {currentUserId && (
                  <>
                    {(!posts && error === ErrorType.INITIAL) && <Loader />}
                    {posts && (
                      <>
                        {posts.length ? (
                          <PostsList
                            posts={posts}
                            handleOnPostClick={handleOnPostClick}
                            currentPostId={currentPostId}
                          />
                        ) : (
                          <div
                            className="notification is-warning"
                            data-cy="NoPostsYet"
                          >
                            No posts yet
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {error !== ErrorType.INITIAL && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
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
              { 'Sidebar--open': currentPostId },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPostId && (
                <PostDetails
                  comments={comments}
                  setComments={setComments}
                  error={error}
                  showNewCommentForm={showNewCommentForm}
                  handleOnWriteACommentClick={handleOnWriteACommentClick}
                  handleCommentDelete={handleCommentDelete}
                  currentPostId={currentPostId}
                  currentPostTitle={currentPostTitle}
                  currentPostBody={currentPostBody}
                  post={post}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
