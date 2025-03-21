import React from 'react';
import { Post } from '../types/Post';
import { PostsItem } from './PostItem';

type Props = {
  posts: Post[];
  selected: Post | null;
  onSelect: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, selected, onSelect }) => {
  return (
    <>
      {posts.length === 0 ? (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      ) : (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table
            className="table
            is-fullwidth is-striped is-hoverable is-narrow"
          >
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
                <PostsItem
                  post={post}
                  key={post.id}
                  selected={selected}
                  onSelect={onSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
