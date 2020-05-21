import React from 'react';
import { Comments } from '../api';

type Props = {
  comment: Comments;
};

const Comment: React.FC<Props> = ({ comment }) => (
  <li className="comment">
    <h2>
      {comment.name}
    </h2>
    <p>
      {comment.body}
    </p>
    <p>
      {comment.email}
    </p>
  </li>
);

export default Comment;
