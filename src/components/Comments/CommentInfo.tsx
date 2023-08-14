import { FC } from 'react';
import { Comment } from '../../types';
import { useCommentsContext } from '../../hooks';

type Props = {
  comment: Comment;
};

export const CommentInfo: FC<Props> = ({ comment }) => {
  const { onDeleteComment } = useCommentsContext();

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
          {comment.name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => onDeleteComment(comment.id)}
        />
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};
