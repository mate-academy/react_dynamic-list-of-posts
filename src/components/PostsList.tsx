/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPostSelect: (post: Post | null) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostSelect,
  selectedPost,
}) => {
  const isPostSelected = (post: Post) => selectedPost?.id === post.id;

  const handlePostSelect = (post: Post) => {
    if (isPostSelected(post)) {
      onPostSelect(null);
    } else {
      onPostSelect(post);
    }
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table
        className="
          table
          is-fullwidth
          is-striped
          is-hoverable
          is-narrow
        "
      >
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">
                {post.id}
              </td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': !isPostSelected(post) },
                  )}
                  onClick={() => handlePostSelect(post)}
                >
                  {isPostSelected(post) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
