import React from 'react';
import './CommentList.scss';
import { CommentListProps } from '../../constants/proptypes';

import Comment from '../Comment/Comment';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment comment={comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = CommentListProps;

export default CommentList;
