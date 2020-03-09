import React, { FC } from 'react';
import { CommentList } from '../Coment/CommentList';
import { User } from '../User/User';
import './Post.css';

interface Props {
  post: PostsInterface;
}

export const PostComponent: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <div className="post">
      <div className="post__autor">
        <User user={user} />
      </div>
      <div className="post__body">
        <h2 className="post__title">
          {title}
        </h2>
        <p className="post__text">
          {body}
        </p>
      </div>
      <div className="post__comment-list">
        <CommentList comments={comments} />
      </div>
    </div>
  );
};
