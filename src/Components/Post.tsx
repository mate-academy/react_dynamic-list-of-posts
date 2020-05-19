import React from 'react';
import User from './User';
import './Post.scss';
import CommentsList from './CommentsList';

type Props = {
  post: Post;
};

const Post: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <article className="post">
      <h2 className="post__title">{post.title}</h2>
      <p className="post__text">{post.body}</p>
      <User user={post.user} />
      <CommentsList comments={post.comments} />
    </article>
  );
};

export default Post;
