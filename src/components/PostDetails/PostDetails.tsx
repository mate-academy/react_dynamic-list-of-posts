import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { AppContext } from '../AppContext';
import * as getServices from '../../services/AppServices';

export const PostDetails: React.FC = () => {
  const [isloading, setIsLoading] = useState(false);
  const [hasErrorMessage, setHasErrorMessage] = useState('');
  const [isActiveButton, setIsActiveButton] = useState(true);

  const { selectedPost, setComments, comments } = useContext(AppContext);

  useEffect(() => {
    setHasErrorMessage('');
    setIsActiveButton(true);

    if (selectedPost) {
      setIsLoading(true);
      setHasErrorMessage('');

      getServices.getPostComments(selectedPost.id)
        .then(setComments)
        .catch(() => setHasErrorMessage('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost, setComments]);

  const handleFormComments = () => {
    setIsActiveButton(false);
  };

  const handleDeleteComment = (commentId: number) => {
    setHasErrorMessage('');
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    getServices.getDeleteComment(commentId)
      .catch(() => setHasErrorMessage('Something went wrong!'));
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
              {!hasErrorMessage && (
                <>
                  {isloading && <Loader />}

                  {!isloading && !comments?.length ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments: </p>
                      <>
                        {comments?.map(({
                          id, name, email, body,
                        }) => (
                          <article
                            className="message is-small"
                            data-cy="Comment"
                            key={id}
                          >
                            <div className="message-header">
                              <a
                                href={`mailto:${email}`}
                                data-cy="CommentAuthor"
                              >
                                {name}
                              </a>
                              <button
                                data-cy="CommentDelete"
                                type="button"
                                className="delete is-small"
                                aria-label="delete"
                                onClick={() => handleDeleteComment(id)}
                              >
                                delete button
                              </button>
                            </div>
                            <div className="message-body" data-cy="CommentBody">
                              {body}
                            </div>
                          </article>
                        ))}
                      </>
                    </>
                  )}

                  {!isloading && isActiveButton && (
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

              {hasErrorMessage && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {hasErrorMessage}
                </div>
              )}
            </div>

            {!isActiveButton && !hasErrorMessage && (
              <NewCommentForm
                setErrorMessage={(message) => setHasErrorMessage(message)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
