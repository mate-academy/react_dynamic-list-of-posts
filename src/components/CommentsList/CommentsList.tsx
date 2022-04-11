import React from 'react';

type Props = {
  comments: Comment[]
  removeComment: (commentId: number) => void;
};

export const CommentsList: React.FC<Props> = ({ comments, removeComment }) => {
  return (
    <ul className="PostDetails__list">
      {comments.map(comment => (
        <li
          className="PostDetails__list-item"
          key={comment.id}
        >
          <button
            type="button"
            className="PostDetails__remove-button button"
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
