import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  selectedPost: Post | undefined;
  setSelectedPostId: (postId: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPostId,
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
          <PostItem
            post={post}
            key={post.id}
            selectedPost={selectedPost}
            setSelectedPostId={setSelectedPostId}
          />
        ))}
      </tbody>
    </table>
  </div>
);
