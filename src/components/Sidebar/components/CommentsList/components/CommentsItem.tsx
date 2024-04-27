import React, { useContext } from 'react';
import { deleteComment } from '../../../../../api/comments';
import { Comment } from '../../../../../types/Comment';
import { postsContext } from '../../../../../Store';
import { ErrorText } from '../../../../../types/ErrorText';

type Props = { comment: Comment; onError: (v: ErrorText) => void };

export const CommentItem: React.FC<Props> = React.memo(
  ({ comment, onError }) => {
    const { id, name, email, body } = comment;
    const { setters } = useContext(postsContext);
    const { setComments } = setters;

    const handleDelete = () => {
      deleteComment(id)
        .then(() => {
          setComments(oldComments =>
            oldComments.filter(oldComment => oldComment.id !== id),
          );
        })
        .catch(() => {
          onError(ErrorText.failLoad);
        });
    };

    return (
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
            onClick={handleDelete}
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {body}
        </div>
      </article>
    );
  },
);
CommentItem.displayName = 'CommentItem';
