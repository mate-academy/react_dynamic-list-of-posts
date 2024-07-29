import React from 'react';
import { Post } from '../../types/Post';
import PostInfo from './PostInfo';

type Props = {
  posts: Post[];
  chosenPost: Post | null;
  onClickPost: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onClickPost,
  chosenPost,
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
          <PostInfo
            key={post.id}
            post={post}
            onClickPost={onClickPost}
            chosenPost={chosenPost}
          />
        ))}
      </tbody>
    </table>
  </div>
);
