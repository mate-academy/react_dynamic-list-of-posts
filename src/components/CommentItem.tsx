import { Comment } from '../types/Comment';
import { useDeleteComment } from '../utils/hooks';

type Props = {
  comment: Comment;
  onDelete: (id: number) => void;
  onError: (str: string) => void;
};

export const CommentItem: React.FC<Props> = ({
  comment,
  onDelete,
  onError,
}) => {
  const { handleDelete } = useDeleteComment(onError);

  const handleCommentDelete = async () => {
    try {
      await handleDelete(comment.id);
      onDelete(comment.id);
    } catch (error) {}
  };

  return (
    <>
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
    </>
  );
};
