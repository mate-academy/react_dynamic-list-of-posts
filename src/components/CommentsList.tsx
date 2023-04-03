import { Dispatch, SetStateAction } from 'react';
import { deleteComment } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  comments: Comment[];
  setHasCommentDeleteError: (value: boolean) => void;
  setComments: Dispatch<SetStateAction<Comment[]>>;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  setHasCommentDeleteError,
  setComments,
}) => {
  const handleCommentDelete = (id: number) => {
    setHasCommentDeleteError(false);
    setComments(prev => prev.filter(comment => comment.id !== id));

    deleteComment(id)
      .catch(() => {
        const commentToRestore = comments.find(comment => comment.id === id);

        if (commentToRestore) {
          setComments(prev => [...prev, commentToRestore]);
        }

        setHasCommentDeleteError(true);
      });
  };

  return (
    <>
      {comments.map(comment => (
        <article
          key={comment.id}
          className="message is-small"
          data-cy="Comment"
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
              onClick={() => handleCommentDelete(comment.id)}
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
