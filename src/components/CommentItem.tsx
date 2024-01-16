import { FC } from 'react';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { useCommentContext } from '../context/CommentContext';

type Props = {
  comment: Comment,
};

export const CommentItem: FC<Props> = ({ comment }) => {
  const { setComments } = useCommentContext();

  const handleCommentDelete = async () => {
    try {
      setComments(prev => prev
        .filter(prevComment => prevComment.id !== comment.id));

      await client.delete(`/comments/${comment.id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
          onClick={handleCommentDelete}
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
