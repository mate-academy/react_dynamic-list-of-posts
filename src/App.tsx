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
import { getUsers } from './api/users';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { getPosts } from './api/posts';
import { Error } from './types/Error';
import { addComments, deleteComments, getComments } from './api/comments';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersPosts, setUsersPosts] = useState<Post[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isShowingForm, setIsShowingForm] = useState<boolean>(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);
      setError(null);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setError(Error.CommentsError))
        .finally(() => setIsLoadingComments(false));
    }
  }, [selectedPost]);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);
      setError(null);

      getPosts(selectedUser.id)
        .then(setUsersPosts)
        .catch(() => setError(Error.CannotLoadPosts))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUser]);

  const handleCommentFormSubmit = (
    postId: number,
    authorName: string,
    authorEmail: string,
    commentBody: string,
  ) => {
    setIsSubmittingForm(true);

    if (
      !authorName.trim().length ||
      !authorEmail.trim().length ||
      !commentBody.trim().length
    ) {
      setIsShowingForm(false);
      setIsSubmittingForm(false);

      return;
    }

    const newComment: Comment = {
      id: 0,
      postId: postId,
      name: authorName.trim(),
      email: authorEmail.trim(),
      body: commentBody.trim(),
    };

    addComments(postId, authorName, authorEmail, commentBody)
      .then(() => {
        setComments((currentComments: Comment[] = []) => [
          ...currentComments,
          newComment,
        ]);
      })
      .catch(() => setError(Error.CommentsError))
      .finally(() => setIsSubmittingForm(false));
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComments(commentId)
      .then(() => {
        setComments((currentComments: Comment[] = []) =>
          currentComments.filter(
            (comment: Comment) => comment.id !== commentId,
          ),
        );
      })
      .catch(() => setError(Error.CommentsError));
  };

  useEffect(() => {
    setSelectedPost(null);
  }, [selectedUser]);

  const showNoPostMessage =
    !error && !isLoadingPosts && selectedUser && !usersPosts.length;

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
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoadingPosts && <Loader />}

                {error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!usersPosts.length && !isLoadingPosts && (
                  <PostsList
                    posts={usersPosts}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            {selectedPost && (
              <div className="tile is-child box is-success">
                <PostDetails
                  post={selectedPost}
                  comments={comments}
                  isLoadingComments={isLoadingComments}
                  error={error}
                  isShowingForm={isShowingForm}
                  setIsShowingForm={setIsShowingForm}
                  isSubmittingForm={isSubmittingForm}
                  setIsSubmittingForm={setIsSubmittingForm}
                  handleCommentFormSubmit={handleCommentFormSubmit}
                  handleDeleteComment={handleDeleteComment}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
