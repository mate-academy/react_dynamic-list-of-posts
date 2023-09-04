import React, { useContext, useEffect, useState } from 'react';
import { deleteComment, getComments } from '../api/posts';
import { PostContext } from '../PostProvider';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const { selectedPost, comments, setComments } = useContext(PostContext);

  const [showNewCommentForm, setShowNewCommentForm] = useState<boolean>(false);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [isCommentError, setIsCommentError] = useState<boolean>(false);
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false);

  useEffect(() => {
    setShowNewCommentForm(false);
    if (selectedPost) {
      setIsCommentLoading(true);
      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsCommentError(true))
        .finally(() => setIsCommentLoading(false));
    }
  }, [selectedPost]);

  const handleDelete = (commentId: number) => {
    setIsDeleteError(false);
    const deletedComment = comments
      .find(comment => comment.id === commentId);

    setComments(currComments => currComments
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId)
      .catch(() => {
        setIsDeleteError(true);
        if (deletedComment) {
          setComments(currComments => [...currComments, deletedComment]);
        }
      });
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
          {isCommentLoading ? (
            <Loader />
          ) : (
            <>
              {isCommentError ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                  <button
                    type="button"
                    className="delete"
                    aria-label="delete"
                    onClick={() => setIsCommentError(false)}
                  />
                </div>
              ) : (
                <>
                  {!comments.length ? (
                    <p className="title is-4">No comments yet</p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>
                      {comments.map((comment) => (
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
                </>
              )}

              {isDeleteError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Can`t delete this comment
                  <button
                    type="button"
                    className="delete"
                    aria-label="delete"
                    onClick={() => setIsDeleteError(false)}
                  />
                </div>
              )}

              {!showNewCommentForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setShowNewCommentForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {showNewCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
