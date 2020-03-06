import React, { FC } from 'react';

import './PostList.css';
import { Post } from '../Post/Post';


interface Props {
  postList: PostWithComments[];
}

export const PostList: FC<Props> = ({ postList }) => (
  <ul className="postList">
    {postList.map((post) => {

      return (
        <Post
          key={post.id}
          post={post}
        />
      );
    })}
  </ul>
);

