import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { DispatchContext, StatesContext } from '../context/Store';

export const PostDetails: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    selectedPostId,
    postsByUserId,
    isLoading,
    errorMessage,
    commentsByPostId,
    isCommentFormActive: commentForm,
  } = useContext(StatesContext);

  const post = postsByUserId.find(p => selectedPostId === p.id);

  const handleOnClickWrite = () =>
    dispatch({ type: 'SET_COMMENTFORMACTIVE', payload: true });

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {commentsByPostId.length === 0 ? (
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
