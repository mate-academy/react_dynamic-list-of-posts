import React from 'react';
import { Post } from '../types/Post';
import { PostInfo } from './PostInfo';

type Props = {
  posts: Post[]
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostInfo
              key={post.id}
              post={post}
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
