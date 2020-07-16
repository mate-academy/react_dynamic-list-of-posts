import React from 'react';
import { Comment } from '../interfaces/data';

export const CommentItem: React.FC<Comment> = ({ name, body, email }) => (
  <section className="comment">
    <h3 className="comment__title">{name}</h3>
    <span className="comment__email">{email}</span>
    <p className="comment__body">{body}</p>
  </section>
);
