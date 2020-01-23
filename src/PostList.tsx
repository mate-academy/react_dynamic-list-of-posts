import React from 'react';

type Props = {
  posts: Post[];
};

const PostsList: React.FC<Props> = ({ posts }) => (
  <ul>
    {posts.map((post) => (
      <li>
        <b>{post.title}</b>
        <div>{post.body}</div>
        <hr />
      </li>
    ))}
  </ul>
);

export default PostsList;
