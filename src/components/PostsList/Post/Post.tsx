import React, { FC } from 'react';
import './Post.css';
import { CommentsList } from './CommentsList/CommentsList';

interface Props {
  post: PreparedPost;
}

export const Post: FC<Props> = ({
  post,
}) => {
  const {
    user,
    title,
    body,
    comments,
  } = post;

  return (
    <li className="post">
      <div className="post__author author">
        <p className="author__name">
          {user.name}
        </p>
      </div>
      <div className="post__info">
        <h2 className="post__title">
          {title}
        </h2>
        <p className="post__text">
          {body}
        </p>
      </div>
      <div className="post__comments">
        <p className="post__comments-title">
          Comments
        </p>
        <CommentsList
          comments={comments}
        />
      </div>
    </li>
  );
};
