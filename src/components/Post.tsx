import React, { FC } from 'react';
import { User } from './User';
import { CommentsList } from './CommentsList';

interface Props {
  post: PostWithUser;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <li className="posts__item">
      <h2>
        {title}
      </h2>
      <p>{body}</p>
      <User user={user} />
      <CommentsList comments={comments} />
    </li>
  );
};
