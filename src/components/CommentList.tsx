import React from 'react';
import { Comment } from './Interfaces';

interface Props {
  comments: Comment[];
}

export const CommentList: React.FC<Props> = ({ comments }) => (
  <ul className="comment-list">
    <h3>Comments:</h3>
    {
      comments.map(comment => (
        <li key={comment.id} className="comment-list__item">
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <span>{comment.email}</span>
        </li>
      ))
    }
  </ul>
);
