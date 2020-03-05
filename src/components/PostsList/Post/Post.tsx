import React, { FC } from 'react';
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
    <div className="post">
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
        <CommentsList
          comments={comments}
        />
      </div>
    </div>
  );
};
