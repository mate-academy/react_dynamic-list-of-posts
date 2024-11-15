import { FC } from 'react';
import { Comment } from '../../types/Comment';

interface CommentsProps {
  comments: Comment[];
  handleDeleteComment: (id: number) => void;
}

export const Comments: FC<CommentsProps> = ({
  comments,
  handleDeleteComment,
}) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

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
              onClick={() => handleDeleteComment(comment.id)}
            ></button>
          </div>

          <div className="message-body" data-cy="CommentBody">
            {comment.body}
          </div>
        </article>
      ))}
    </>
  );
};
