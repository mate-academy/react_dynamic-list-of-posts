import { IComment } from '../../types/Comment.interface';

import './Comment.scss';

type TProps = {
  comment: IComment;
};

export const Comment: React.FC<TProps> = ({ comment }) => {
  return (
    <article className="message is-small" data-cy="Comment">
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
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {comment.body}
      </div>
    </article>
  );
};
