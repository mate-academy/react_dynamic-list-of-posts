import React from 'react';

type Props = {
  id: number;
  name: string;
  email: string;
  body: string;
  handleDelete: (id: number) => void;
};

export const Comment: React.FC<Props> = ({
  id,
  name,
  email,
  body,
  handleDelete,
}) => {
  return (
    <article className="message is-small" data-cy="Comment" key={id}>
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => handleDelete(id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
