import React, { useContext, useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Context } from '../context/Context';
import * as commentService from '../api/comments';
import { Error } from '../types/Error';
import { Loader } from './Loader';

export const PostDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<Error | null>(null);

  const { selectedPost, comments, setIsCommenting, isCommenting, setComments } =
    useContext(Context);

  useEffect(() => {
    setCommentsError(null);
    setIsLoading(true);

    if (selectedPost?.id) {
      commentService
        .getComments(selectedPost.id)
        .then(newComments => setComments(newComments))
        .catch(() => setCommentsError(Error.wrong))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [selectedPost, setComments]);

  const handleDeleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    commentService
      .deleteComment(commentId)
      .catch(error => {
        setComments(comments);
        setCommentsError(Error.wrong);
        throw error;
      })
      .finally(() => setCommentsError(null));
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

        {commentsError && (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            {commentsError}
          </div>
        )}

        {isLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && commentsError === null && (
          <div className="block">
            {comments.length > 0 ? (
              <p className="title is-4">Comments:</p>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}
            {comments.map(comment => (
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
            {!isCommenting && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsCommenting(true)}
              >
                Write a comment
              </button>
            )}
          </div>
        )}

        {isCommenting && <NewCommentForm />}
      </div>
    </div>
  );
};
