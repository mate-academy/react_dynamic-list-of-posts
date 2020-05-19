import React, { FC } from 'react';
import { User } from '../User';
import { CommentList } from '../Comments/CommentsList';

interface Props {
  post: PostWithComments;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title, body, user, comments,
  } = post;

  return (
    <div className="box">
      <h3 className="title is-3">{title}</h3>
      <p>{body}</p>
      <User user={user} />
      <hr />
      <h4 className="title is-4">Comments</h4>
      <CommentList comments={comments} />
    </div>
  );
};
