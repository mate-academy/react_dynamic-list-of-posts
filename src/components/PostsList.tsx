import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[],
  currentPost: Post | null,
  setCurrentPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  currentPost,
  setCurrentPost,
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
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
          />
        ))}
      </tbody>
    </table>
  </div>
);
