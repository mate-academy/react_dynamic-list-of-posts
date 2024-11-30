import React from 'react';
import { Post } from '../types/Post';
import { OnePost } from './OnePost';

type Props = {
  posts: Post[];
  activePostId: number | null;
  setActivePostId: (param: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  activePostId,
  setActivePostId,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
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
          <OnePost
            key={post.id}
            post={post}
            activePostId={activePostId}
            setActivePostId={setActivePostId}
          />
        ))}
      </tbody>
    </table>
  </div>
);
