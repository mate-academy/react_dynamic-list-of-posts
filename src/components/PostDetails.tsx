import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { DispatchContext, StateContext } from '../utils/GlobalStateProvider';
import { getComments } from '../api/getComments';
import { deleteComments } from '../api/deleteComment';

export const PostDetails: React.FC = () => {
  const { selectedPost, isFormEnabled, comments } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setIsError(false);

      getComments(selectedPost.id)
        .then(data => {
          dispatch({ type: 'setComments', payload: data });
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedPost, dispatch]);

  const handleCreatingComm = () => {
    dispatch({ type: 'setIsFormEnabled', payload: true });
  };

  const handleDelete = (commentId: number) => {
    setIsError(false);

    dispatch({
      type: 'setComments',
      payload: comments.filter(comment => comment.id !== commentId),
    });
    deleteComments(commentId).catch(() => {
      setIsError(true);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : (
              <>
                {!comments?.length ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>
                    {comments?.map(comment => (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={comment.id}
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${comment.email}`}
                            data-cy="CommentAuthor"
                          >
                            {comment.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDelete(comment.id)}
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
                {!isFormEnabled && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={handleCreatingComm}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      {isFormEnabled && selectedPost?.id && (
        <NewCommentForm postId={selectedPost.id} />
      )}
    </div>
  );
};
