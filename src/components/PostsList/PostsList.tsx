import React, { FC } from 'react';
import { PostInterface } from '../../interfaces/PostInterface';
import { PostItem } from '../PostItem';

interface PostsListProps {
  posts: PostInterface[];
}

export const PostsList: FC<PostsListProps> = ({ posts }) => {
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
