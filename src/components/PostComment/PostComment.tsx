import React from 'react';
import './PostComment.scss';

type Props = {
  comment: PostComment;
  handleDeleteComment: (x: number) => void;
};

export const PostComment: React.FC<Props> = ({
  comment,
  handleDeleteComment,
}) => {
  return (
    <li
      className="PostDetails__list-item"
    >
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={() => handleDeleteComment(comment.id)}
      >
        X
      </button>
      <p>{comment.body}</p>
    </li>
  );
};
