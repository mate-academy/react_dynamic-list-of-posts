import React from 'react';
import { usePosts } from '../../PostsContext';
import { Errors } from '../../types/Errors';
import { CommentItem } from '../CommentItem/CommentItem';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    loadingComments,
    errorMessage,
    comments,
    openForm,
    setOpenForm,
  } = usePosts();

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {loadingComments && (<Loader />)}

          {errorMessage === Errors.loadingComments && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              {Errors.loadingComments}
            </div>
          )}

          {!comments.length && !loadingComments && !errorMessage && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}

          {comments.length > 0 && !loadingComments && !errorMessage && (
            <>
              <p className="title is-4">
                Comments:
              </p>
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </>
          )}
        </div>
      </div>

      {openForm ? (
        <NewCommentForm />
      ) : (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setOpenForm(true)}
        >
          Write a comment
        </button>
      )}
    </div>
  );
};
