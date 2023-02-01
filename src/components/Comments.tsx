import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { ErrorType } from '../types/ErrorTypes';
import { getComments, deleteComment } from './API/Comments';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';

type Props = {
  postId: number,
  onNewComment: () => void,
  isPostingComment: boolean,
};

export const Comments: React.FC<Props> = React.memo(({
  postId,
  onNewComment,
  isPostingComment,
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isPostingComment) {
      setIsCommentsLoading(true);

      getComments(postId)
        .then(result => setComments(result))
        .catch(() => setIsError(true))
        .finally(() => setIsCommentsLoading(false));
    }
  }, [postId]);

  useEffect(() => {
    if (!isPostingComment && !isDeleting) {
      getComments(postId)
        .then(result => setComments(result))
        .catch(() => setIsError(true))
        .finally(() => {
          setDeletedCommentId(null);
        });
    }
  }, [isPostingComment, isDeleting]);

  const visibleComments = useMemo(() => {
    return comments;
  }, [comments]);

  const onCommentDelete = (commentId: number) => {
    setDeletedCommentId(commentId);
    setIsDeleting(true);
    deleteComment(commentId)
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="block">
      {isCommentsLoading && <Loader />}

      {(!isCommentsLoading && !comments?.length) && (
        <div
          className="notification is-warning"
          data-cy="NoPostsYet"
        >
          No comments yet
        </div>
      )}

      {isError && (
        <div className="notification is-danger" data-cy="CommentsError">
          {ErrorType.CommentsLoading}
        </div>
      )}

      {(!isCommentsLoading
        && comments?.length !== 0) && (
        <>
          <p className="title is-4">Comments:</p>
          {visibleComments?.map(comment => (
            <article
              className={cn(
                'message is-small',
                { 'is-hidden': deletedCommentId === comment.id },
              )}
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
                  onClick={() => {
                    onCommentDelete(comment.id);
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

      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
        onClick={onNewComment}
      >
        Write a comment
      </button>
    </div>
  );
});
