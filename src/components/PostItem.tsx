import React from 'react';
import { PostExtended } from '../interfaces/data';
import { PostAuthor } from './PostAuthor';
import { CommentList } from './CommentList';

export const PostItem: React.FC<PostExtended> = ({
  title,
  body,
  author,
  comments,
}) => {
  return (
    <section className="post">
      <h2 className="post__title">{title}</h2>
      <p className="post__body">{body}</p>
      <PostAuthor {...author} />
      <CommentList comments={comments} />
    </section>
  );
};
