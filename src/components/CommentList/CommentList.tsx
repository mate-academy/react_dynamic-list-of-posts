import React, { FC } from 'react';
import { Comment } from '../Comment/Comment';
import { CommentInterface } from '../../constants/types';

interface Props {
  comments: CommentInterface[];
}

export const CommentList: FC<Props> = ({ comments }) => {
  return (
    <div className="commentList">
      <div className="comments">
        {
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        }
      </div>
    </div>
  );
};
