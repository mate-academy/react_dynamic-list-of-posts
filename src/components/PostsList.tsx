import React, { useCallback } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

interface ListProps {
  posts: Post[];
  selectedPostId?: number;
  onSelect: (id: number) => void;
}

export const PostsList: React.FC<ListProps> = ({
  posts,
  selectedPostId,
  onSelect,
}) => {
  const handleSelect = useCallback(
    (postId: number) => {
      onSelect(postId);
    },
    [onSelect],
  );

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
                    className={classNames(`button`, `is-link`, {
                      'is-light': isSelected,
                    })}
                    onClick={e => {
                      e.preventDefault();
                      handleSelect(post.id);
                    }}
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
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPostId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};
