import React from 'react';
import Post from './Post';

type PropsPostList = {
  list: Post[];
  highlightSearch: string;
};

const PostList: React.FC<PropsPostList> = ({ list, highlightSearch }) => (
  <>
    {list.map((post: Post) => (
      <Post
        {...post}
        key={post.id}
        highlightedText={highlightSearch}
      />
    ))}
  </>
);

export default PostList;
