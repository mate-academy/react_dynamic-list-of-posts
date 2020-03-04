import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentType } from '../../utils/interfaces';

interface Props {
  commentList: CommentType[];
}

export const CommentList: FC<Props> = ({ commentList }) => (
  <div>
    {commentList.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </div>
);
