import React from 'react';
import { PostItem } from './PostItem';

type Props = {
  posts: PostFromServer[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <ul className="post__list">
        {posts.map(post => (
          <li className="post__item" key={post.id}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </>
  );
};
