import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePosts } from '../hooks/usePosts';
import { deleteComment, getComments } from '../api/postService';
import { ErrorNotification } from './ErrorNotification';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    postComments,
    setPostComments,
    hasFormError,
  } = usePosts();

  const [isLoading, setIsLoading] = useState(false);
  const [hasCommentsError, setHasCommentsError] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const handleCommentDelete = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setPostComments(prevComments => {
          if (prevComments) {
            return prevComments.filter(comment => (
              comment.id !== commentId
            ));
          }

          return null;
        });
      });
  };

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setHasCommentsError(false);

      getComments(selectedPost.id)
        .then(setPostComments)
        .catch(() => {
          setHasCommentsError(true);
          setPostComments(null);
        })
        .finally(() => setIsLoading(false));

      setIsFormActive(false);
    }
  }, [selectedPost, setPostComments]);

  return (
    <>
      {selectedPost && (
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
              {(!hasFormError && !hasCommentsError) && (
                isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {postComments?.length ? (
                      <>
                        <p className="title is-4">Comments:</p>

                        {postComments?.map((comment) => (
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
                                onClick={() => handleCommentDelete(comment.id)}
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
                    ) : (
                      <p className="title is-4" data-cy="NoCommentsMessage">
                        No comments yet
                      </p>
                    )}
                  </>
                )
              )}

              {(hasFormError || hasCommentsError) && (
                <ErrorNotification />
              )}

              {(!isFormActive && !hasCommentsError && !hasFormError) && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsFormActive(true)}
                >
                  Write a comment
                </button>
              )}
            </div>

            {(isFormActive && !hasFormError) && (
              <NewCommentForm />
            )}
          </div>
        </div>
      )}
    </>
  );
};
