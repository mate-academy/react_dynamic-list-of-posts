import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../Comments/NewCommentForm';
import { PostsContext } from './PostContext';
import { PostCommentsType } from '../../types/PostCommentsType';
import { CommentsList } from '../Comments/CommentsList';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    details,
    setFormIsVisible,
    formIsVisible,
  } = useContext(PostsContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {details === PostCommentsType.IsLoading && (
            <Loader />
          )}

          {details === PostCommentsType.CommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {details === PostCommentsType.NoCommentsMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {details === PostCommentsType.CommentsList && (
            <CommentsList />
          )}

          {(details === PostCommentsType.CommentsList
            || details === PostCommentsType.NoCommentsMessage)
            && !formIsVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormIsVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formIsVisible && <NewCommentForm />}
      </div>
    </div>
  );
};
