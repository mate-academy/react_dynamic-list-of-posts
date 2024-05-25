import { FC } from 'react';
import { Comment } from '../types/Comment';

interface IProps {
  comments: Comment[];
  deleteComment: (id: number) => void;
}

export const UserComments: FC<IProps> = ({ comments, deleteComment }) => {
  return (
    <>
      {comments.map(comment => (
        <article
          className="message is-small"
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
              onClick={() => deleteComment(comment.id)}
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
  );
};
