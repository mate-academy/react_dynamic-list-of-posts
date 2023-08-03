import React from 'react';
import { IPost } from '../models/IPost';
import PostListItem from './PostListItem';

type PostListProps = {
  posts: IPost[],
};
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

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
          {
            posts.map(post => (
              <PostListItem post={post} key={post.id} />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};
