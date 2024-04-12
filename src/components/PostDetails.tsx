import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import * as commentService from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    setComments,
    comments,
    isCommentsLoading,
    commentError,
  } = useContext(Context);

  const [isFormShown, setIsFormShown] = useState(false);

  const selectedPostComments = comments?.filter(
    c => c.postId === selectedPost?.id,
  );

  useEffect(() => {
    setIsFormShown(false);
  }, [selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    const updatedComments =
      comments?.filter(comment => comment.id !== commentId) ?? null;

    setComments(updatedComments);

    commentService.deleteComment(commentId).catch(() => {
      throw new Error('Unable to delete a comment');
    });
  };

  return (
    <div className="content" data-cy="PostDetails" key={selectedPost?.id}>
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading ? (
            <Loader />
          ) : commentError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentError}
            </div>
          ) : (
            <>
              {selectedPostComments && (
                <>
                  {selectedPostComments.length === 0 ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>
                      {selectedPostComments.map(comment => (
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
                  )}

                  {!isFormShown && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setIsFormShown(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {isFormShown && !commentError && <NewCommentForm />}
      </div>
    </div>
  );
};
