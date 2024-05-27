import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { DispatchContext, StateContext } from '../utils/Store';
import { deleteComments, getComments } from '../api/posts';

export const PostDetails: React.FC = () => {
  const state = useContext(StateContext);
  const { selectedPost, comments, isForm } = state;
  const dispatch = useContext(DispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    if (selectedPost) {
      getComments(selectedPost?.id)
        .then(dataComments => {
          dispatch({
            type: 'setComments',
            payload: dataComments,
          });
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    setIsError(false);

    deleteComments(commentId)
      .then(() => {
        dispatch({
          type: 'setComments',
          payload: comments.filter(comment => comment.id !== commentId),
        });
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const handleCreatingComm = () => {
    dispatch({ type: 'setIsForm', payload: true });
  };

  return (
    <div className="content" data-cy="PostDetails">
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
                  {!comments.length ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
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
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                >
                                  delete button
                                </button>
                              </div>

                              <div
                                className="message-body"
                                data-cy="CommentBody"
                              >
                                {comment.body}
                              </div>
                            </article>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}

          {!isForm && !isLoading && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleCreatingComm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && selectedPost?.id && (
          <NewCommentForm postId={selectedPost.id} />
        )}
      </div>
    </div>
  );
};
