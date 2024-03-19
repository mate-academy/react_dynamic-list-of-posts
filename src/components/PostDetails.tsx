import React, { useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ListContext } from './ListContext';
import { delComment } from '../api/api';

export const PostDetails: React.FC = () => {
  const context = useContext(ListContext);
  const { selectedPost, isLoadingComments } = context;
  const { comments, delCommentFromState, addComment, setAddComment } = context;
  const { errorMessageComment } = context;

  useEffect(() => {
    setAddComment(false);
  }, [selectedPost]);

  const handlerDeleteComment = (commentId: number) => {
    delCommentFromState(commentId);

    delComment(commentId)
      .then()
      .catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost?.id}: ${selectedPost?.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost?.body}</p>
          </div>

          <div className="block">
            {isLoadingComments ? (
              <Loader />
            ) : (
              <>
                {errorMessageComment ? (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    {errorMessageComment}
                  </div>
                ) : (
                  <>
                    {comments.length === 0 ? (
                      <p className="title is-4" data-cy="NoCommentsMessage">
                        No comments yet
                      </p>
                    ) : (
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
                                onClick={() => {
                                  handlerDeleteComment(comment.id);
                                }}
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
                    {!addComment && (
                      <button
                        data-cy="WriteCommentButton"
                        type="button"
                        className="button is-link"
                        onClick={() => setAddComment(true)}
                      >
                        Write a comment
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {addComment && <NewCommentForm />}
        </div>
      )}
    </div>
  );
};
