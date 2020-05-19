import React from 'react';
import Post from './Post';

type Props = {
  posts: Post[];
};

const PostsList: React.FunctionComponent<Props> = ({ posts }) => {
  return (
    <div className="container">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsList;
