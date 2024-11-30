import React from 'react';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  onDelete: (id: number) => void;
};

export const CommentList: React.FC<Props> = ({ comments, onDelete }) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.map(comm => (
        <article className="message is-small" data-cy="Comment" key={comm.id}>
          <div className="message-header">
            <a href={`mailto:${comm.email}`} data-cy="CommentAuthor">
              {comm.name}
            </a>
            <button
              data-cy="CommentDelete"
              type="button"
              className="delete is-small"
              aria-label="delete"
              onClick={() => onDelete(comm.id)}
            />
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comm.body}
          </div>
        </article>
      ))}
    </>
  );
};
