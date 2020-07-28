import React from 'react';
import './Post.css';
import { User } from '../User/User';
import { CommentList } from '../CommentList/CommentList';

interface PostProps {
  post: Post;
}

export const Post: React.FC<PostProps> = (props) => {
  const { post } = props;

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <User userData={post.user} />

      <ul className="post__comments">
        <CommentList comments={post.comments} />
      </ul>
    </div>
  );
};
