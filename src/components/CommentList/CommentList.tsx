import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';

interface Props {
  comments: Comment[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <ul className="commentList">
      {comments.map(item => <Comment key={item.id} comment={item} />)}
    </ul>
  );
};
