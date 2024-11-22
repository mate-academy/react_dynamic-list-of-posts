import React, { memo } from 'react';
import { Comment } from '../types/Comment';
import { ErrorNotification } from './ErrorNotification';

type Props = {
  comment: Comment;
  onDelete: (id: number) => void;
  deletingErrorPostIds: number[];
};

export const CommentItem: React.FC<Props> = memo(function CommentItem({
  comment,
  onDelete,
  deletingErrorPostIds,
}) {
  const { id, name, email, body } = comment;

  return (
    <>
      <article className="message is-small" data-cy="Comment">
        <div className="message-header">
          <a href={`mailto:${email}`} data-cy="CommentAuthor">
            {name}
          </a>
          <button
            data-cy="CommentDelete"
            type="button"
            className="delete is-small"
            aria-label="delete"
            onClick={() => {
              onDelete(id);
            }}
          ></button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {body}
        </div>
      </article>

      {deletingErrorPostIds.includes(id) && (
        <ErrorNotification
          errorMessage="
                Unable to delete the comment. Try again!
              "
        />
      )}
    </>
  );
});
