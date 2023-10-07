import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePosts } from './PostContext';
import * as commentService from '../services/comments';
import { ErrorNotification } from './ErrorNotification';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    selectedUser,
    comments,
    setComments,
  } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deleteComment = (id: number) => {
    const newComments = [...comments].filter(com => com.id !== id);

    setComments(newComments);

    return commentService.deleteComment(id);
  };

  const getPostComments = (id: number) => {
    setIsLoading(true);

    return commentService.getPostComments(id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (selectedPost) {
      getPostComments(selectedPost.id);
      setFormIsActive(false);
    }
  }, [selectedPost]);

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <ErrorNotification />
              )}

              {!errorMessage && !comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  {!errorMessage && (
                    <>
                      <p className="title is-4">Comments:</p>

                      {comments.map(comment => (
                        <article
                          className="message is-small"
                          data-cy="Comment"
                          key={comment.id}
                        >
                          <div className="message-header">
                            <a
                              href={`mailto:${selectedUser?.email}`}
                              data-cy="CommentAuthor"
                            >
                              {selectedUser?.name}
                            </a>
                            <button
                              data-cy="CommentDelete"
                              type="button"
                              className="delete is-small"
                              aria-label="delete"
                              onClick={() => deleteComment(comment.id)}
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
                </>
              )}

              {!errorMessage && !formIsActive && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setFormIsActive(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {formIsActive && !errorMessage && (
          <NewCommentForm
            errorMessage={errorMessage}
            onFail={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
