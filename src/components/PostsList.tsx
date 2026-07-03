import React, { memo } from 'react';
import { Post } from '../types/Post';
import PropTypes from 'prop-types';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  selectedPostId: number | null;
  onPostClick: (post: Post) => void;
};

export const PostsList: React.FC<Props> = memo(
  ({ posts, selectedPostId, onPostClick }: Props) => {
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
            {posts.map(post => {
              const isSelected = post.id === selectedPostId;

              return (
                <tr key={post.id} data-cy="Post">
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">{post.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button', 'is-link', {
                        'is-light': !isSelected,
                      })}
                      onClick={() => onPostClick(post)}
                    >
                      {isSelected ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
);

PostsList.displayName = 'PostsList';

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPostId: PropTypes.number,
  onPostClick: PropTypes.func.isRequired,
};
