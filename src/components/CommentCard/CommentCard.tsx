import React, { MouseEventHandler } from 'react';
// Api requests
import { deleteComment } from '../../api/comments';
// Types
import { LoadComments } from '../../types/LoadComments';

type Props = {
  id: number;
  postId: number;
  body: string;
  loadComments: LoadComments;
};

export const CommentCard: React.FC<Props> = ({
  id,
  body,
  postId,
  loadComments,
}) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    deleteComment(id)
      .then(() => loadComments(postId));
  };

  return (
    <>
      <button
        type="button"
        className="PostDetails__remove-button button"
        onClick={clickHandler}
      >
        X
      </button>
      <p>{body}</p>
    </>
  );
};
