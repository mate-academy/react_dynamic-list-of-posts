import React, { FC } from 'react';
import { PostListInterface } from '../../interfaces';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';

interface PostProps {
  post: PostListInterface;
}

export const Post: FC<PostProps> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <>
      <h1 className="post__title">
        {title}
      </h1>
      <p className="post__body">
        {body}
      </p>
      <ul className="post__user user">
        <User user={user} />
      </ul>
      <CommentList commentList={comments} />
    </>
  );
};
