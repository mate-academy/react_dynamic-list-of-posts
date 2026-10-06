import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import PropTypes from 'prop-types';

export const PostsList: React.FC<{
  posts: Post[];
  selectedPostId: number | null;
  onSelectPost: (post: Post) => void;
}> = ({ posts, selectedPostId, onSelectPost }) => (
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
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button is-link', {
                  'is-light': post.id !== selectedPostId,
                })}
                onClick={() => onSelectPost(post)}
              >
                {post.id === selectedPostId ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

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
  onSelectPost: PropTypes.func.isRequired,
};
