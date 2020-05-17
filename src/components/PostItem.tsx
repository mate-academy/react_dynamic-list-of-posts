import React from 'react';
import { User } from './User';
import { CommentsList } from './CommentList';

type Props = {
  post: PostsFromServer;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comment,
  } = post;

  return (
    <div>
      <h2>{title}</h2>
      <p>{body}</p>
      <section className="post__personalInfo">
        <User user={user} />
      </section>
      <section className="comments">
        <CommentsList comment={comment} />
      </section>
    </div>
  );
};
