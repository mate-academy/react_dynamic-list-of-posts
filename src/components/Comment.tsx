import React from 'react';
import { Comments } from '../api/api';

type Props = {
  comment: Comments;
}

const Comment: React.FC<Props> = ({ comment }) => (
  <li>
    <hr />
    <h4 className="comments__name">{comment.name}</h4>
    <p className="comments__text">{comment.body}</p>
    <p className="comments__email">{comment.email}</p>
  </li>
);

export default Comment;
