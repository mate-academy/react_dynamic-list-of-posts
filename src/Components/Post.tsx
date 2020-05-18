import React from 'react';
import User from './User';
import './Post.scss';
import CommentsList from './CommentsList';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: Post | any;
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
