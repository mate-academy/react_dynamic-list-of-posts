import { useContext } from 'react';
import { Comment } from '../../types/Comment';
import * as commentAPI from '../../api/commentAPI';
import { PostContext } from '../../context/PostContext';

type Props = {
  comment: Comment;
};

export const CommentItem: React.FC<Props> = ({ comment }) => {
  const { setComments, setErrorMessage } = useContext(PostContext);

  const deleteComment = () => {
    setComments(currentComments => currentComments
      .filter(currentComment => currentComment.id !== comment.id));

    commentAPI.removeComment(comment.id)
      .catch(() => setErrorMessage('Something went wrong'));
  };

  return (
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
