import React from 'react';

type Props = {
  comment: Comments;
};

export const CommentsItem: React.FC<Props> = ({ comment }) => {
  return (
    <tr className="comment__row">
      <td>{comment.name}</td>
      <td>{comment.email}</td>
      <td>{comment.body}</td>
    </tr>
  );
};
