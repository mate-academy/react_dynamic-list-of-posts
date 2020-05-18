
import React from 'react';
import { CommentsListPropsType, Comment } from './interfaces';

export const CommentsList: React.FC<CommentsListPropsType> = (props) => {
  return (
    <ul>
      <br />
      {props.commentsList.map((comment: Comment) => (
        <li key={comment.id}>
          <span>{comment.body}</span>
          <br />
          <strong>{comment.name}</strong>
          {' '}
          &nbsp;
          <span>{comment.email}</span>
        </li>
      ))}
    </ul>
  );
};
