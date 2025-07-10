import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  onDeleteComment: (id: number) => Promise<void>;
};

export const Comments: React.FC<Props> = ({ comments, onDeleteComment }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comment => {
        const { id, body, name, email } = comment;

        return (
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
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {body}
            </div>
          </article>
        );
      })}
    </>
  );
};
