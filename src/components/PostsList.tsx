import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
  selectedPostId: number,
  onPostSelect: (postId: number) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onPostSelect,
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
            key={post.id}
            post={post}
            selectedPostId={selectedPostId}
            onPostSelect={onPostSelect}
          />
        ))}
      </tbody>
    </table>
  </div>
);
