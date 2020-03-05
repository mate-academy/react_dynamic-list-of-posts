import React, { FC } from 'react';
import { PostsWithUserAndComments } from '../../constants/types';
import { Post } from '../Post/Post';

interface Props {
  posts: PostsWithUserAndComments[];
}

export const PostList: FC<Props> = ({ posts }) => {
  return (
    <div className="list">
      {
        posts.map((post) => <Post key={post.id} post={post} />)
      }
    </div>
  );
};
