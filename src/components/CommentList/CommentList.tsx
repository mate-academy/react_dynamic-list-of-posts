import React, { FC } from 'react';
import { Comment } from '../Comment';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = (props) => {
  const { comments } = props;

  return (
    <div className="content comment-list">
      <div>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
