import React from 'react';
import { PostItem } from '../PostItem';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[],
  selectedPost: Post | null,
  onPostSelect: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPost,
  onPostSelect,
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
            <PostItem
              key={post.id}
              post={post}
              selectedPost={selectedPost}
              onPostSelect={onPostSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
