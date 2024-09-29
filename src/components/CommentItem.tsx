import { useContext, useEffect } from 'react';
import { Comment } from '../types/Comment';
import { PostsContext } from '../services/Store';
import * as todoService from '../api';
import { ErrorType } from '../types/ErrorType';

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { name, body, email, id } = comment;

  const {
    setComments,
    comments,
    setErrorTypeMessage,
    selectedCommentId,
    setSelectedCommentId,
    errorTypeMessage,
  } = useContext(PostsContext);

  useEffect(() => {
    const deleteComment = async () => {
      if (selectedCommentId === id) {
        const newComments = comments.filter(commentEl => commentEl.id !== id);

        setComments(newComments);

        try {
          await todoService.deleteData(`/comments/${selectedCommentId}`);
        } catch {
          setErrorTypeMessage(ErrorType.DeleteCommentError);
        }
      }
    };

    deleteComment();
  }, [
    selectedCommentId,
    setSelectedCommentId,
    comments,
    id,
    setComments,
    setErrorTypeMessage,
  ]);

  return (
    <>
      <article className="message is-small" data-cy="Comment">
        <div className="message-header">
          <a href={`mailto:${email}`} data-cy="CommentAuthor">
            {name}
          </a>
          <button
            data-cy="CommentDelete"
            type="button"
            className="delete is-small"
            aria-label="delete"
            onClick={() => {
              setSelectedCommentId(id);
            }}
          >
            delete button
          </button>
        </div>

        <div className="message-body" data-cy="CommentBody">
          {body}
        </div>
      </article>

      {errorTypeMessage === ErrorType.DeleteCommentError &&
        selectedCommentId === id && (
          <div className="notification is-danger" data-cy="PostsLoadingError">
            {'Something went wrong!'}
          </div>
        )}
    </>
  );
};
