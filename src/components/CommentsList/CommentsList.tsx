import { FC } from 'react';
import { Comment } from '../../types';

interface Props {
  comments: Comment[];
  onDeleteComment: (commentId: Comment['id']) => void;
}

export const CommentsList: FC<Props> = ({ comments, onDeleteComment }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(({ id, email, name, body }) => (
        <article key={id} className="message is-small" data-cy="Comment">
          <div className="message-header">
            <a href={`mailto:${email}`} data-cy="CommentAuthor">
              {name}
            </a>

            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => onDeleteComment(id)}
            />
          </div>

          <div className="message-body" data-cy="CommentBody">
            {body}
          </div>
        </article>
      ))}
    </>
  );
};
