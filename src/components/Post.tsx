import React from 'react';
import { PostWithUser } from '../api/api';
import User from './User';
import CommentList from './CommentList';

type Props = {
  post: PostWithUser;
}

const Post: React.FC<Props> = ({ post }) => (
  <li className="posts__item">
    <div>
      <h3 className="posts__title">{post.title}</h3>
      <p className="posts__text">
        {post.body}
      </p>
    </div>
    <User user={post.user} />
    <CommentList comments={post.comments} />
  </li>
);

export default Post;
