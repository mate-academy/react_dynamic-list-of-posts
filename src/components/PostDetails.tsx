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
    isLoading,
    hasCommentError,
    commentsByPostId,
    isCommentFormActive: commentForm,
  } = useContext(StatesContext);

  const post = postsByUserId.find(p => selectedPostId === p.id);

  const handleOnClickWrite = () =>
    dispatch({ type: 'SET_COMMENTFORMACTIVE', payload: true });

  const handleOnDelete = async (comment: Comment) => {
    dispatch({ type: 'SET_ISLOADING', payload: true });

    deleteComment(comment.id)
      .then(() =>
        dispatch({
          type: 'SET_COMMENTSBYPOSTID',
          payload: commentsByPostId.filter(c => comment.id !== c.id),
        }),
      )
      .catch(() => {
        dispatch({
          type: 'SET_HASCOMMENTERROR',
          payload: true,
        });
        dispatch({ type: 'SET_ISLOADING', payload: false });
      })
      .finally(() => dispatch({ type: 'SET_ISLOADING', payload: false }));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong.
            </div>
          )}

          {commentsByPostId.length === 0 && selectedPostId && !isLoading ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
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

          {!commentForm && (
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

        {commentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
