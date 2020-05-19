import React, { FC } from 'react';
import { Post } from './Post';


interface Props {
  postList: PostWithComments[];
}

export const PostList: FC<Props> = ({ postList }) => (
  <div>
    {postList.map((post) => {
      return (
        <Post
          key={post.id}
          post={post}
        />
      );
    })}
  </div>
);
