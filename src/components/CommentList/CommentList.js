import React from 'react';
import Comment from '../Comment/Comment';
import { CommentsListProps } from '../../constants/proptypes';

import './CommentList.css';

const CommentList = ({ comments }) => (
  <ul className="extra content comment-list">
    {comments.map(comment => (
      <li className="comment-list__item ui card" key={comment.id}>
        <Comment comment={comment} />
      </li>
    ))}
  </ul>
);

CommentList.propTypes = CommentsListProps;

export default CommentList;
