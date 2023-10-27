import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { AppContext } from '../AppContext';
import * as getServices from '../../services/AppServices';

export const PostDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeButton, setActiveButton] = useState(true);

  const { selectedPost, setComments, comments } = useContext(AppContext);

  useEffect(() => {
    setErrorMessage('');
    setActiveButton(true);

    if (selectedPost) {
      setLoading(true);
      setErrorMessage('');

      getServices.getPostComments(selectedPost.id)
        .then(setComments)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [selectedPost, setComments]);

  const handleFormComments = () => {
    setActiveButton(false);
  };

  const handleDeleteComment = (commentId: number) => {
    setErrorMessage('');
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    getServices.getDeleteComment(commentId)
      .catch(() => setErrorMessage('Something went wrong!'));
  };

  return (
    <>
      {selectedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="content" data-cy="PostDetails">
            <div className="block">
              <h2 data-cy="PostTitle">
                {`${selectedPost?.id}: ${selectedPost?.title}`}
              </h2>

              <p data-cy="PostBody">
                {selectedPost?.body}
              </p>
            </div>

            <div className="block">
              {!errorMessage && (
                <>
                  {loading && <Loader />}

                  {!loading && comments?.length === 0 ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments: </p>
                      <>
                        {comments?.map(comment => (
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
                      </>
                    </>
                  )}

                  {!loading && activeButton && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={handleFormComments}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}

              {errorMessage && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMessage}
                </div>
              )}
            </div>

            {!activeButton && !errorMessage && (
              <NewCommentForm
                setErrorMessage={(message) => setErrorMessage(message)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
