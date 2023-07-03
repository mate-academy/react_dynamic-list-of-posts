import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
  onSelectedPost: (post: Post) => void,
  postId: number | null,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectedPost,
  postId,
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

        {!!posts.length && (
          <PostItem
            posts={posts}
            onSelectedPost={onSelectedPost}
            postId={postId}
          />
        )}
      </table>
    </div>
  );
};
