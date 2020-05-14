import React from 'react';

interface Props {
  post: PostType;
}

export const Post = (props: Props) => {
  const { post } = props;

  return (
    <div>
      <h1>
        {post.title}
      </h1>
      <p>
        {post.body}
      </p>
    </div>
  );
};
