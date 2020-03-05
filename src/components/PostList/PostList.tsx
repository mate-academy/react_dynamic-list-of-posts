import React, { FC } from 'react';
import { Post } from '../Post/Post';

interface Props {
  postlist: PostWithComments[];
}

export const PostList: FC<Props> = ({ postlist }) => {
  return (
    <div>
      {postlist.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
