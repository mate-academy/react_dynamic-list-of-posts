import React, { FC } from 'react';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';
import './Post.css';

interface Props {
  post: PostExtended;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    title,
    body,
    user,
    comments,
  } = post;

  return (
    <div className="post">
      <h3 className="post__title">{title}</h3>
      <p className="post__text">{body}</p>
      {user && (
        <User user={user} />
      )}
      <h3 className="comments-title">Comments</h3>
      {comments && (
        <CommentList key={post.id} comments={comments} />
      )}
    </div>
  );
};
