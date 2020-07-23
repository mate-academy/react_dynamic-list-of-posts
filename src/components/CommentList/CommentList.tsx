import React from 'react';
import './CommentList.css';
import { Comment } from '../Comment/Comment';
import { CommentListProps } from '../types';

export const CommentList: React.FC<CommentListProps> = ({ commentList }) => (
  <>
    {commentList.map(comment => (
      <React.Fragment key={comment.id}>
        <div className="post__comment">
          <Comment
            comment={comment}
          />
        </div>
      </React.Fragment>
    ))}
  </>
);
