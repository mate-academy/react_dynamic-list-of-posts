import React, { FC } from 'react';
import './Post.css';
import { PreparedPostType } from '../../utils/interfaces';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface Props {
  post: PreparedPostType;
}

export const Post: FC<Props> = ({ post }) => {
  const {
    author,
    title,
    body,
    postComments,
  } = post;

  return (
    <div className="postItem">
      <User user={author} />
      <h2>{title}</h2>
      <p>{body}</p>
      {`Comments: ${post.postComments.length}`}
      <CommentList commentList={postComments} />
    </div>
  );
};
