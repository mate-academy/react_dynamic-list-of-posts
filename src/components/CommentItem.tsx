import { Dispatch, FC, SetStateAction } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  comment: Comment;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const CommentItem: FC<Props> = ({ comment, setComments }) => {
  const deleteComment = () => {
    setComments(prev => prev.filter(comm => comm.id !== comment.id));
    client.delete(`/comments/${comment.id}`);
  };

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
          onClick={deleteComment}
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
