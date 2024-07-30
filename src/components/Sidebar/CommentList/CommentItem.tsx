import React, { useContext } from 'react';
import { Comment } from '../../../types/Comment';
import { deleteComment } from '../../../utils/fetchFunctions';
import { CommentListContext } from '../../../utils/Store';

interface CommentItemProp {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProp> = ({ comment }) => {
  const { comments, setComments } = useContext(CommentListContext);

  function handleDeleteButton() {
    const newList = comments.filter(item => item.id !== comment.id);
    const copy = [...comments];

    setComments(newList);

    deleteComment(comment.id).catch(() => {
      alert('Failed to delete comment, please try again!');

      setComments(copy);
    });
  }

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
          onClick={handleDeleteButton}
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
