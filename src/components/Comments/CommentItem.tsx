import React, { useContext } from 'react';
import { Comment } from '../../types/Comment';
import { deleteComments } from '../../api/data';
import { CommentsContext } from './CommentContext';

type Props = {
  item: Comment
};

export const CommentItem: React.FC<Props> = ({ item }) => {
  const { comments, setComments } = useContext(CommentsContext);

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(el => el.id !== id));
    deleteComments(id);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${item.email}`} data-cy="CommentAuthor">
          {item.name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => handleDeleteComment(item.id)}
        >
          delete button
        </button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {item.body}
      </div>
    </article>
  );
};
