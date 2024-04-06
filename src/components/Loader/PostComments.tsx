import { deleteComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { Error } from '../../types/Error';

type Props = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  onCommentError: (errorMessage: Error | string) => void;
};

export const PostComments: React.FC<Props> = ({
  comments,
  setComments,
  onCommentError,
}) => {
  const handleDeleteComment = (currentCommentId: number) => {
    onCommentError('');

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== currentCommentId),
    );

    deleteComment(currentCommentId).catch(error => {
      setComments(comments);
      onCommentError(Error.LoadingError);
      throw error;
    });
  };

  return comments.map((comment: Comment) => {
    return (
      <article className="message is-small" data-cy="Comment" key={comment.id}>
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
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {comment.body}
        </div>
      </article>
    );
  });
};
