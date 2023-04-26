import React from 'react';
import { Comment } from '../types/Comment';
import '../styles/commentMessage.scss';

type Props = {
  comments: Comment[],
  onDeleteComment: (commentId: number) => void,
};

export const CommentList: React.FC<Props> = ({
  comments,
  onDeleteComment,
}) => {
  return (
    <>
      <p className="title is-4">
        Comments:
      </p>
      <ul className="content comment-list">
        {comments.map(({
          id,
          email,
          name,
          body,
        }) => (
          <li
            key={id}
            className="message is-small"
            data-cy="Comment"
          >
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
          </li>
        ))}
      </ul>
    </>
  );
};
