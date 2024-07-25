import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { DispatchContext, StatesContext } from '../context/Store';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

export const PostDetails: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    selectedPostId,
    postsByUserId,
    isCommentsLoading,
    hasCommentError,
    commentsByPostId,
    isCommentFormActive,
  } = useContext(StatesContext);

  const post = postsByUserId.find(p => selectedPostId === p.id);

  const isNoCommentsMsgActive =
    commentsByPostId.length === 0 &&
    selectedPostId &&
    !isCommentsLoading &&
    !hasCommentError;

  const isCommentsListActive =
    commentsByPostId.length !== 0 &&
    selectedPostId &&
    !isCommentsLoading &&
    !hasCommentError;

  const handleOnClickWrite = () =>
    dispatch({ type: 'SET_COMMENTFORM', payload: true });

  const handleOnDelete = (comment: Comment) => {
    dispatch({ type: 'SET_COMMENTSLOADER', payload: true });
    dispatch({
      type: 'SET_COMMENTSBYPOSTID',
      payload: commentsByPostId.filter(c => comment.id !== c.id),
    });
    deleteComment(comment.id)
      .catch(() => {
        dispatch({
          type: 'SET_COMMENTERROR',
          payload: true,
        });
        dispatch({ type: 'SET_COMMENTSLOADER', payload: false });
      })
      .finally(() => dispatch({ type: 'SET_COMMENTSLOADER', payload: false }));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {hasCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong.
            </div>
          )}

          {isNoCommentsMsgActive && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsListActive && (
            <>
              <p className="title is-4">Comments:</p>
              {commentsByPostId.map(comment => (
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
                      onClick={() => handleOnDelete(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}
          {!isCommentFormActive && !isCommentsLoading && !hasCommentError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOnClickWrite}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormActive && <NewCommentForm />}
      </div>
    </div>
  );
};
