import React from 'react';
import { Post } from '../types/Post';
import { PostCard } from './PostCard/PostCard';

type Props = {
  posts: Post[];
  loadPost: (id: number) => void;
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  loadPost,
  setSelectedPost,
  selectedPost,
}) => (
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
          <PostCard
            post={post}
            key={post.id}
            loadPost={loadPost}
            setSelectedPost={setSelectedPost}
            selectedPost={selectedPost}
          />
        ))}
      </tbody>
    </table>
  </div>
);
