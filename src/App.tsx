import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import {
  deleteComment,
  getPostComments,
  getUserPosts,
  getUsers,
} from './api';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState(ErrorType.NONE);
  const [selectedUserPosts, setSelectedUserPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    setErrorMessage(ErrorType.NONE);

    getUsers()
      .then((usersFromServer) => setUsers(usersFromServer))
      .catch(() => setErrorMessage(ErrorType.LoadingFailed));
  }, []);

  const handleUserSelect = (userId: number) => {
    setSelectedPostId(null);
    setSelectedUserPosts([]);
    setErrorMessage(ErrorType.NONE);

    if (userId === selectedUserId) {
      return;
    }

    setIsLoading(true);
    setSelectedUserId(userId);

    getUserPosts(userId)
      .then((userPostsFromServer) => {
        if (userPostsFromServer.length === 0) {
          setErrorMessage(ErrorType.NOPOSTS);
        }

        setSelectedUserPosts(userPostsFromServer);
      })
      .catch(() => {
        setErrorMessage(ErrorType.LoadingFailed);
        setSelectedUserPosts([]);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCommentsLoad = (postId: number) => {
    setIsLoading(true);
    setErrorMessage(ErrorType.NONE);

    getPostComments(postId)
      .then(commentsFromServer => setPostComments(commentsFromServer))
      .catch(() => setErrorMessage(ErrorType.LoadingFailed))
      .finally(() => setIsLoading(false));
  };

  const handlePostSelect = (postId: number | null) => {
    if (!postId) {
      setSelectedPostId(null);

      return;
    }

    if (postId === selectedPostId) {
      setSelectedPostId(null);

      return;
    }

    setIsFormActive(false);
    setSelectedPostId(postId);
    handleCommentsLoad(postId);
  };

  const handleAddComment = (arg: Comment | null) => {
    if (!arg) {
      setErrorMessage(ErrorType.LoadingFailed);

      return;
    }

    setPostComments([...postComments, arg]);
  };

  const handleCommentDelete = (commentId: number) => {
    const updatedComments
      = postComments.filter(comment => commentId !== comment.id);

    setPostComments(updatedComments);

    deleteComment(commentId)
      .catch(() => setErrorMessage(ErrorType.LoadingFailed));
  };

  const selectedPost
    = selectedUserPosts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUserId={selectedUserId}
                  onSelectUser={handleUserSelect}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!errorMessage && !selectedUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isLoading && !selectedUserPosts.length && <Loader />}

                {errorMessage === ErrorType.LoadingFailed
                && !selectedUserPosts.length
                && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {errorMessage}
                  </div>
                )}

                {
                  !isLoading
                  && errorMessage === ErrorType.NOPOSTS
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      {errorMessage}
                    </div>
                  )
                }

                {selectedUserPosts.length > 0
                  && (
                    <PostsList
                      selectedUserPosts={selectedUserPosts}
                      selectedPostId={selectedPostId}
                      onSelectPost={handlePostSelect}
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
              { 'Sidebar--open': selectedPostId },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPostId
                && (
                  <PostDetails
                    selectedPost={selectedPost}
                    isLoading={isLoading}
                    postComments={postComments}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleCommentDelete}
                    errorMessage={errorMessage}
                    isFormActive={isFormActive}
                    onSetIsFormActive={setIsFormActive}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
