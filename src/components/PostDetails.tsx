import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { AppContext } from '../context/AppContext';
import { Comment } from '../types/Comment';
import { deletePostComment } from '../api/comments';

export const PostDetails: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { selectedPost, errors, postComments } = state;
  const { isLoading, post: targetPost } = selectedPost;
  const { comments, isWriting } = postComments;

  const commentsError = errors.find(
    error => error.type === 'CommentsError' && error.errorValue,
  );

  const handleDeleteComment = async (commentId: Comment['id']) => {
    const commentsCopy = [...postComments.comments];
    const deleteCommentLocally = [...commentsCopy].filter(
      comment => comment.id !== commentId,
    );

    dispatch({ type: 'DELETE_COMMENT', payload: deleteCommentLocally });

    try {
      await deletePostComment(commentId);
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          type: 'CommentsError',
        },
      });

      dispatch({ type: 'LOAD_POST_COMMENTS', payload: commentsCopy });
    }
  };

  // #region conditions
  const noComments = !comments.length && !commentsError && !isLoading;

  const showComments = !comments.length && !commentsError && !isLoading;

  const showWriteButton = !isWriting && !isLoading && !commentsError;

  const showNewCommentForm = isWriting && !isLoading && !commentsError;
  // #endregion

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${targetPost?.id}: ${targetPost?.title}`}
          </h2>

          <p data-cy="PostBody">{targetPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {showComments && <p className="title is-4">Comments:</p>}

          {comments.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {showWriteButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() =>
                dispatch({ type: 'WRITING_COMMENT_STATUS', payload: true })
              }
            >
              Write a comment
            </button>
          )}
        </div>

        {showNewCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
