import React, { FC } from 'react';
import { PreparedPost } from '../../interfaces';
import { CommentList } from '../CommentList/CommentList';
import { UserItem } from '../UserItem/UserItem';
import './Post.css';

interface Props {
  content: PreparedPost;
}

export const Post: FC<Props> = ({ content }) => {
  const { post, user, comments } = content;
  const { title, body } = post;

  return (
    <div className="card text-white bg-primary mb-3">
      <UserItem user={user} />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{body}</p>
      </div>
      <CommentList comments={comments} />
    </div>
  );
};
