import React from 'react';
import { Comment } from '../../helpers/api';
import './CommentCard.css';

type Props = {
  comment: Comment;
}

export const CommentCard: React.FC<Props> = ({ comment }) => (
  <li className="post__comment comment">
    <h3 className="comment__title">
      {comment.name}
    </h3>
    <p className="comment__text">
      {comment.body}
    </p>
    <span className="comment__email">
      {comment.email}
    </span>
  </li>
);
