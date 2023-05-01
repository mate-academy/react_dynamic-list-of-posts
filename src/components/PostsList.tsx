import React from 'react';
import { Post } from '../types/Post';
import { PostCell } from './PostCell';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostCell
              key={post.id}
              post={post}
              setSelectedPost={setSelectedPost}
              isPostSelected={selectedPost?.id === post.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
