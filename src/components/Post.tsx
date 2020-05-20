import React from 'react';
import { CommentList } from './CommentList';
import { User } from './User';


type Props = {
  post: PostType;
};

export const Post: React.FC<Props> = ({ post }) => (
  <li className="post__item">
    <div className="post__article">
      <h3 className="post__title">
        {post.title}
      </h3>
      <p className="post_text">
        {post.body}
      </p>
    </div>
    <User user={post.user} />
    <hr />
    <h3>Comments:</h3>
    <CommentList comments={post.comments} />
  </li>
);
