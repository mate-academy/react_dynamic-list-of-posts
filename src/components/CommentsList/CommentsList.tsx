import React from 'react';
import { ForComment } from '../../Types/Comment';
import './CommentsList.scss';

type Props = {
  comments: ForComment[],
  removeComment: (commentId: number) => void,
};

export const CommentsList: React.FC<Props> = ({
  comments, removeComment,
}) => {
  return (
    <ul className="CommentsList__list">
      {comments.map((comment: ForComment) => (
        <li key={comment.id} className="CommentsList__list-item">
          <button
            type="button"
            className="CommentsList__remove-button button"
            onClick={() => removeComment(comment.id)}
          >
            X
          </button>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};
