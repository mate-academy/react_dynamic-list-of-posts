import React from 'react';
import { Post } from '../types/Post';
import { PostComponent } from './PostComponent';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelect,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post: Post) => {
            return (
              <PostComponent
                post={post}
                selectedPost={selectedPost}
                onSelect={onSelect}
                key={post.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
