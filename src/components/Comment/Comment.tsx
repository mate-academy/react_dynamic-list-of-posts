import React from 'react';
import { CommentProps } from '../types';

export const Comment: React.FC<CommentProps> = ({ comment }) => (
  <>
    <b>{comment.name}</b>
    <p>{comment.body}</p>
    <i><span>{comment.email}</span></i>
  </>
);
