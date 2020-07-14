import React, { FC } from 'react';
import { Post } from '../../interfaces/Post';
import { PostItem } from '../PostItem';

interface Props {
  posts: Post[];
}

export const PostsList: FC<Props> = ({ posts }) => {
  return (
    <ul>
      {
        posts.map((post) => (
          post.user && (
            <PostItem
              key={post.id}
              user={post.user}
              title={post.title}
              body={post.body}
              comments={post.comments || []}
            />
          )
        ))
      }
    </ul>
  );
};
