import React from 'react';
import shortid from 'shortid';

import './CommentList.scss';
import { CommentListProps } from '../../constants/proptypes';
import Comment from '../Comment/Comment';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map(comment => (
        <Comment key={shortid.generate()} comment={comment} />
      ))}
    </div>
  );
}

CommentList.propTypes = CommentListProps;

export default CommentList;
