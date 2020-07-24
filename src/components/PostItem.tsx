import React from 'react';
import { CommentsList } from './CommentsList';

type Props = {
  title: string;
  body: string;
  user?: {
    name: string | undefined;
    email: string | undefined;
    street: string | undefined;
  };
  comments: Comments[];
};

export const PostItem: React.FC<Props> = ({
  title,
  body,
  user,
  comments,
}) => {
  return (
    <li>
      <div className="post">
        <div className="post__user">{user?.name}</div>
        <div className="post__text">
          <h2 className="post__title">{title}</h2>
          <p className="post__body">{body}</p>
        </div>
        <div>
          <CommentsList comments={comments} />
        </div>
      </div>
    </li>
  );
};
