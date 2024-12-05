import React from 'react';
import { Post } from '../types/Post';
import PostItem from './PostItem';

type Props = {
  posts: Post[];
  currentPost: Post | null;
  setCurrentPost: (post: Post | null) => void;
  setIsShowForm: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  currentPost,
  setCurrentPost,
  setIsShowForm,
}) => (
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
        {posts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setIsShowForm={setIsShowForm}
          />
        ))}
      </tbody>
    </table>
  </div>
);
