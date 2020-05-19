import React from 'react';
import { CommentList } from './CommentList';

type Props = {
  comments: Comment[];
  body: string;
  title: string;
  username: string;
  email: string;
  address: Address;
};

export const PostListItem: React.FC<Props> = (
  {
    comments,
    body,
    title,
    username,
    email,
    address,
  },
) => {
  return (
    <>
      <li className="post-list__item">
        <h1>{title}</h1>
        <h2>{username}</h2>
        <h3>{email}</h3>
        <h4>{address.city}</h4>
        <p>{body}</p>
        <CommentList
          comments={comments}
        />
      </li>
    </>
  );
};
