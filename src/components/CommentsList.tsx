import React from 'react';
import { Comment } from '../types/Comment';
import { CommentUser } from './Comment';

type Props = {
  postComments: Comment[],
  removeComment: (id: number) => Promise<void>
};

export const CommentsList: React.FC<Props> = ({
  postComments,
  removeComment,
}) => {
  return (
    <>
      <p className="title is-4">Comments:</p>

      {postComments.map((commentItem) => (
        <CommentUser
          key={commentItem.id}
          commentData={commentItem}
          removeComment={removeComment}
        />
      ))}
    </>
  );
};
