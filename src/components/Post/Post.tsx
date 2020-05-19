import React from 'react';
import './Posts.css';

type Props = {
  title: string;
  body: string;
};

const Post: React.FC<Props> = ({ title, body }) => {
  return (
    <article className="post">
      <h2 className="post__header">{title}</h2>
      <p className="post__text">{body}</p>
    </article>
  );
};

export default Post;
